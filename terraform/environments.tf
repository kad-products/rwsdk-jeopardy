resource "github_repository_environment" "integration" {
  environment = "integration"
  repository  = github_repository.repo.name

  deployment_branch_policy {
    protected_branches     = false
    custom_branch_policies = true
  }
}

resource "github_repository_environment_deployment_policy" "integration_semver_tags" {
  repository  = github_repository.repo.name
  environment = github_repository_environment.integration.environment
  tag_pattern = "v*"
}

resource "github_repository_environment" "staging" {
  environment = "staging"
  repository  = github_repository.repo.name

  reviewers {
    users = [data.github_user.admin.id]
  }

  deployment_branch_policy {
    protected_branches     = false
    custom_branch_policies = true
  }
}

resource "github_repository_environment_deployment_policy" "staging_semver_tags" {
  repository  = github_repository.repo.name
  environment = github_repository_environment.staging.environment
  tag_pattern = "v*"
}

resource "github_repository_environment" "production" {
  environment = "production"
  repository  = github_repository.repo.name

  reviewers {
    users = [data.github_user.admin.id]
  }

  deployment_branch_policy {
    protected_branches     = false
    custom_branch_policies = true
  }
}

resource "github_repository_environment_deployment_policy" "production_semver_tags" {
  repository  = github_repository.repo.name
  environment = github_repository_environment.production.environment
  tag_pattern = "v*"
}
