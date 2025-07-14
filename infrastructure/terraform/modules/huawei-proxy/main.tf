terraform {
  required_version = ">= 1.0"
  required_providers {
    huaweicloud = {
      source  = "huaweicloud/huaweicloud"
      version = "~> 1.40"
    }
  }
}

# VPC for proxy instances
resource "huaweicloud_vpc" "proxy_vpc" {
  name   = var.vpc_name
  cidr   = var.vpc_cidr
  region = var.region
}

# Subnet for proxy instances
resource "huaweicloud_vpc_subnet" "proxy_subnet" {
  name       = "${var.vpc_name}-subnet"
  cidr       = var.subnet_cidr
  gateway_ip = var.subnet_gateway_ip
  vpc_id     = huaweicloud_vpc.proxy_vpc.id
  region     = var.region
}

# Security group for proxy
resource "huaweicloud_networking_secgroup" "proxy_sg" {
  name        = "${var.project_name}-proxy-sg"
  description = "Security group for proxy instances"
  region      = var.region
}

# Security group rules
resource "huaweicloud_networking_secgroup_rule" "proxy_ingress_http" {
  security_group_id = huaweicloud_networking_secgroup.proxy_sg.id
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 80
  port_range_max    = 80
  remote_ip_prefix  = "0.0.0.0/0"
  region            = var.region
}

resource "huaweicloud_networking_secgroup_rule" "proxy_ingress_https" {
  security_group_id = huaweicloud_networking_secgroup.proxy_sg.id
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 443
  port_range_max    = 443
  remote_ip_prefix  = "0.0.0.0/0"
  region            = var.region
}

resource "huaweicloud_networking_secgroup_rule" "proxy_ingress_ssh" {
  security_group_id = huaweicloud_networking_secgroup.proxy_sg.id
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 22
  port_range_max    = 22
  remote_ip_prefix  = var.admin_cidr
  region            = var.region
}

resource "huaweicloud_networking_secgroup_rule" "proxy_egress" {
  security_group_id = huaweicloud_networking_secgroup.proxy_sg.id
  direction         = "egress"
  ethertype         = "IPv4"
  remote_ip_prefix  = "0.0.0.0/0"
  region            = var.region
}

# EIP for proxy instances
resource "huaweicloud_vpc_eip" "proxy_eip" {
  count = var.proxy_count

  publicip {
    type = "5_bgp"
  }
  bandwidth {
    name        = "${var.project_name}-proxy-${count.index + 1}-bandwidth"
    size        = var.bandwidth_size
    share_type  = "PER"
    charge_mode = "traffic"
  }
  region = var.region
}

# ECS instances for proxy
resource "huaweicloud_compute_instance" "proxy" {
  count = var.proxy_count

  name               = "${var.project_name}-proxy-${count.index + 1}"
  image_id           = var.image_id
  flavor_id          = var.flavor_id
  security_group_ids = [huaweicloud_networking_secgroup.proxy_sg.id]
  availability_zone  = var.availability_zones[count.index % length(var.availability_zones)]
  key_pair           = var.key_pair_name
  region             = var.region

  network {
    uuid = huaweicloud_vpc_subnet.proxy_subnet.id
  }

  user_data = base64encode(templatefile("${path.module}/user-data.sh", {
    backend_ips = var.backend_ips
    domain_name = var.domain_name
  }))

  tags = merge(var.tags, {
    Role = "proxy"
    Index = count.index + 1
  })
}

# Associate EIP with instances
resource "huaweicloud_vpc_eip_associate" "proxy_eip_assoc" {
  count = var.proxy_count

  public_ip = huaweicloud_vpc_eip.proxy_eip[count.index].address
  port_id   = huaweicloud_compute_instance.proxy[count.index].network[0].port
  region    = var.region
}

# Output values
output "proxy_public_ips" {
  description = "Public IP addresses of proxy instances"
  value       = huaweicloud_vpc_eip.proxy_eip[*].address
}

output "proxy_private_ips" {
  description = "Private IP addresses of proxy instances"
  value       = huaweicloud_compute_instance.proxy[*].network[0].fixed_ip_v4
}

output "vpc_id" {
  description = "VPC ID"
  value       = huaweicloud_vpc.proxy_vpc.id
}

output "subnet_id" {
  description = "Subnet ID"
  value       = huaweicloud_vpc_subnet.proxy_subnet.id
}

