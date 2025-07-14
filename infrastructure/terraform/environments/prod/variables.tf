# Contabo variables
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

# Huawei Cloud variables
variable "huawei_access_key" {
  description = "Huawei Cloud Access Key"
  type        = string
  sensitive   = true
}

variable "huawei_secret_key" {
  description = "Huawei Cloud Secret Key"
  type        = string
  sensitive   = true
}

variable "huawei_region" {
  description = "Huawei Cloud region"
  type        = string
  default     = "ap-southeast-1"
}

variable "huawei_image_id" {
  description = "Huawei Cloud image ID for Ubuntu 22.04"
  type        = string
  # This needs to be updated with actual image ID from Huawei Cloud
}

variable "huawei_key_pair_name" {
  description = "Huawei Cloud key pair name"
  type        = string
}

variable "huawei_availability_zones" {
  description = "Huawei Cloud availability zones"
  type        = list(string)
  default     = ["ap-southeast-1a", "ap-southeast-1b"]
}

# Common variables
variable "ssh_public_key" {
  description = "SSH public key for server access"
  type        = string
}

variable "ssh_private_key_path" {
  description = "Path to SSH private key file"
  type        = string
  default     = "~/.ssh/id_rsa"
}
