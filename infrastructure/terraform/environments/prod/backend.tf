# Terraform state backend configuration
# Using S3-compatible storage (you can use AWS S3, MinIO, or other S3-compatible storage)
terraform {
  backend "s3" {
    bucket         = "mercadolibre-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "mercadolibre-terraform-locks"
    
    # If using AWS S3
    # profile = "your-aws-profile"
    
    # If using MinIO or other S3-compatible storage
    # endpoint                    = "https://minio.yourdomain.com"
    # skip_credentials_validation = true
    # skip_metadata_api_check     = true
    # force_path_style            = true
  }
}
