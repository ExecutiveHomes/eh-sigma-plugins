# run on core shared services account
terraform {
  backend "s3" {
    key    = "eh-signma-plugins.github-trust.tfstate"
    bucket = "eh-611524785219-terraform-use2"
    region = "us-east-2"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.30"
    }
  }
}

# Configure the core-shard-services AWS Provider
provider "aws" {
  alias  = "core-shared-services"
  region = "us-east-1"
  assume_role {
    role_arn = "arn:aws:iam::354803805069:role/OrganizationAccountAccessRole"
  }
  default_tags {
    tags = {
      source = "terraform"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  default_tags {
    tags = {
      source = "terraform"
    }
  }
}

module "policy" {
  source = "git@github.com:ExecutiveHomes/terraform-modules.git//terraform-aws-iam-github-policy-module?ref=main"

  repo_name  = "eh-sigma-plugins"
  policy_dir = "${abspath(path.module)}/policy"
}
