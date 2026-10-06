module "repo" {
  source = "github.com/kad-products/platform//open-tofu/modules/github-repo?ref=v1.17.0"

  repo_name        = "rwsdk-jeopardy"
  repo_description = "Remake of Jeopardy using synced state for multi-device fun"
  is_product       = true
  required_checks = [
    "lint-code / lint-code",
    "plan-github-setup / plan-open-tofu",
    "run-tests / run-tests",
    "lint-commits / lint-commits",
    "create-release-dry-run / create-release-dry-run",
  ]
}
