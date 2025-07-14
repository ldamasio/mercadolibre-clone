terraform {
  required_version = ">= 1.0"
  required_providers {
    huaweicloud = {
      source  = "huaweicloud/huaweicloud"
      version = "~> 1.40"
    }
    null = {
      source  = "hashicorp/null"
      version = "~> 3.1"
    }
  }
}

# Configure providers
provider "huaweicloud" {
  region     = var.huawei_region
  access_key = var.huawei_access_key
  secret_key = var.huawei_secret_key
}

# Local variables
locals {
  project_name = "mercadolibre"
  environment  = "prod"
  
  common_tags = {
    Project     = local.project_name
    Environment = local.environment
    ManagedBy   = "Terraform"
    Repository  = "github.com/ldamasio/mercadolibre-clone"
  }
  
  # Contabo VPS configuration for MicroK8s cluster
  vps_instances = {
    master-1 = {
      name     = "${local.project_name}-master-1"
      location = "EU"
      vps_type = "VPS-L"  # 8 vCPU, 30 GB RAM
      os_type  = "ubuntu-22.04"
      ssh_key  = var.ssh_public_key
      role     = "master"
    }
    master-2 = {
      name     = "${local.project_name}-master-2"
      location = "EU"
      vps_type = "VPS-L"
      os_type  = "ubuntu-22.04"
      ssh_key  = var.ssh_public_key
      role     = "master"
    }
    master-3 = {
      name     = "${local.project_name}-master-3"
      location = "EU"
      vps_type = "VPS-L"
      os_type  = "ubuntu-22.04"
      ssh_key  = var.ssh_public_key
      role     = "master"
    }
    worker-1 = {
      name     = "${local.project_name}-worker-1"
      location = "EU"
      vps_type = "VPS-M"  # 6 vCPU, 16 GB RAM
      os_type  = "ubuntu-22.04"
      ssh_key  = var.ssh_public_key
      role     = "worker"
    }
    worker-2 = {
      name     = "${local.project_name}-worker-2"
      location = "EU"
      vps_type = "VPS-M"
      os_type  = "ubuntu-22.04"
      ssh_key  = var.ssh_public_key
      role     = "worker"
    }
  }
}

# Contabo VPS instances
module "contabo_vps" {
  source = "../../modules/contabo-vps"
  
  vps_instances         = local.vps_instances
  contabo_client_id     = var.contabo_client_id
  contabo_client_secret = var.contabo_client_secret
  ssh_public_key        = var.ssh_public_key
  tags                  = local.common_tags
}

# Huawei Cloud proxy layer
module "huawei_proxy" {
  source = "../../modules/huawei-proxy"
  
  region             = var.huawei_region
  project_name       = local.project_name
  vpc_name           = "${local.project_name}-proxy-vpc"
  proxy_count        = 2
  image_id           = var.huawei_image_id
  key_pair_name      = var.huawei_key_pair_name
  availability_zones = var.huawei_availability_zones
  backend_ips        = values(module.contabo_vps.vps_instances)[*].ip_address
  domain_name        = "merli.leandrodamasio.com"
  tags               = local.common_tags
}

# Generate Ansible inventory
resource "local_file" "ansible_inventory" {
  content = templatefile("${path.module}/templates/inventory.yml.tpl", {
    master_nodes = [for k, v in module.contabo_vps.vps_instances : v if contains(local.vps_instances[k].role, "master")]
    worker_nodes = [for k, v in module.contabo_vps.vps_instances : v if contains(local.vps_instances[k].role, "worker")]
    proxy_nodes  = module.huawei_proxy.proxy_public_ips
  })
  filename = "${path.module}/../../../ansible/inventories/prod/hosts.yml"
}

# Output values
output "contabo_vps_ips" {
  description = "IP addresses of Contabo VPS instances"
  value       = module.contabo_vps.vps_instances
}

output "huawei_proxy_ips" {
  description = "Public IP addresses of Huawei proxy instances"
  value       = module.huawei_proxy.proxy_public_ips
}

output "cluster_info" {
  description = "Kubernetes cluster information"
  value = {
    master_nodes = [for k, v in module.contabo_vps.vps_instances : v if contains(local.vps_instances[k].role, "master")]
    worker_nodes = [for k, v in module.contabo_vps.vps_instances : v if contains(local.vps_instances[k].role, "worker")]
  }
}

output "dns_records" {
  description = "DNS records to be configured"
  value = {
    "merli.leandrodamasio.com"         = module.huawei_proxy.proxy_public_ips
    "backend.merli.leandrodamasio.com" = module.huawei_proxy.proxy_public_ips
  }
}