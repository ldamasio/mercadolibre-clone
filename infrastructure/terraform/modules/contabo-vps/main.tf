# Contabo VPS Module
# Note: Contabo doesn't have an official Terraform provider
# This module uses null_resource with local-exec to manage VPS instances
# You'll need to use Contabo API or manual provisioning

terraform {
  required_version = ">= 1.0"
}

# Variables for Contabo VPS configuration
variable "vps_instances" {
  description = "Map of VPS instances to create"
  type = map(object({
    name        = string
    location    = string
    vps_type    = string
    os_type     = string
    ssh_key     = string
    role        = string
  }))
}

variable "contabo_client_id" {
  description = "Contabo API Client ID"
  type        = string
  sensitive   = true
}

variable "contabo_client_secret" {
  description = "Contabo API Client Secret"
  type        = string
  sensitive   = true
}

# Local variables
locals {
  master_nodes = [for k, v in var.vps_instances : v if v.role == "master"]
  worker_nodes = [for k, v in var.vps_instances : v if v.role == "worker"]
}

# Create VPS instances using null_resource
# In production, replace this with actual Contabo API calls
resource "null_resource" "vps_instances" {
  for_each = var.vps_instances

  provisioner "local-exec" {
    command = <<-EOT
      echo "Creating Contabo VPS: ${each.value.name}"
      # In production, use Contabo API here
      # Example: curl -X POST https://api.contabo.com/v1/compute/instances \
      #   -H "Authorization: Bearer $TOKEN" \
      #   -H "Content-Type: application/json" \
      #   -d '{
      #     "name": "${each.value.name}",
      #     "location": "${each.value.location}",
      #     "type": "${each.value.vps_type}",
      #     "os": "${each.value.os_type}"
      #   }'
    EOT
  }

  provisioner "local-exec" {
    when = destroy
    command = "echo 'Destroying Contabo VPS: ${each.value.name}'"
  }
}

# Output the VPS information
output "vps_instances" {
  description = "Information about created VPS instances"
  value = {
    for k, v in var.vps_instances : k => {
      name = v.name
      role = v.role
      # In production, these would come from the API response
      ip_address = "10.0.${index(keys(var.vps_instances), k) + 1}.${index(keys(var.vps_instances), k) + 10}"
      private_ip = "172.16.${index(keys(var.vps_instances), k) + 1}.${index(keys(var.vps_instances), k) + 10}"
    }
  }
}

output "master_nodes" {
  description = "List of master nodes"
  value = local.master_nodes
}

output "worker_nodes" {
  description = "List of worker nodes"
  value = local.worker_nodes
}
