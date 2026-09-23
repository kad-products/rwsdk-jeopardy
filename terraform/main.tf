terraform {
  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 6.0"
    }
  }
}

provider "github" {
  owner = "kad-products"
  token = var.kad_workflow_automation
}

data "github_user" "admin" {
  username = "arsdehnel"
}
