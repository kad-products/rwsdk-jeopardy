resource "github_repository_ruleset" "main" {
  name        = "main"
  repository  = github_repository.repo.name
  target      = "branch"
  enforcement = "active"

  bypass_actors {
    actor_type  = "OrganizationAdmin"
    bypass_mode = "always"
  }

  conditions {
    ref_name {
      include = ["refs/heads/main"]
      exclude = []
    }
  }

  rules {
    required_status_checks {
      required_check {
        context = "commitlint / commitlint"
      }
      required_check {
        context = "unit-tests"
      }
      required_check {
        context = "build"
      }
      required_check {
        context = "component-tests"
      }
      strict_required_status_checks_policy = true
    }
  }
}
