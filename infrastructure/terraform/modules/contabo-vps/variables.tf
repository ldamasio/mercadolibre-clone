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
  default = {}
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

variable "ssh_public_key" {
  description = "SSH public key for VPS access"
  type        = string
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}
