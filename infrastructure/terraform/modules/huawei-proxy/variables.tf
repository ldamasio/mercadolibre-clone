variable "region" {
  description = "Huawei Cloud region"
  type        = string
  default     = "ap-southeast-1"
}

variable "project_name" {
  description = "Project name"
  type        = string
}

variable "vpc_name" {
  description = "VPC name"
  type        = string
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "subnet_cidr" {
  description = "Subnet CIDR block"
  type        = string
  default     = "10.0.1.0/24"
}

variable "subnet_gateway_ip" {
  description = "Subnet gateway IP"
  type        = string
  default     = "10.0.1.1"
}

variable "proxy_count" {
  description = "Number of proxy instances"
  type        = number
  default     = 2
}

variable "image_id" {
  description = "Image ID for ECS instances (Ubuntu 22.04)"
  type        = string
}

variable "flavor_id" {
  description = "Flavor ID for ECS instances"
  type        = string
  default     = "s6.small.1" # 1 vCPU, 1GB RAM
}

variable "key_pair_name" {
  description = "Key pair name for SSH access"
  type        = string
}

variable "bandwidth_size" {
  description = "Bandwidth size in Mbps"
  type        = number
  default     = 100
}

variable "availability_zones" {
  description = "List of availability zones"
  type        = list(string)
}

variable "backend_ips" {
  description = "List of backend IP addresses"
  type        = list(string)
}

variable "domain_name" {
  description = "Domain name for the application"
  type        = string
  default     = "merli.leandrodamasio.com"
}

variable "admin_cidr" {
  description = "CIDR block for admin access"
  type        = string
  default     = "0.0.0.0/0" # Restrict this in production
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}
