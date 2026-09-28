module "repo" {
  source = "github.com/kad-products/platform//open-tofu/modules/github-repo?ref=v1.6.1"

  repo_name        = "rwsdk-jeopardy"
  repo_description = "Remake of Jeopardy using synced state for multi-device fun"
  is_product       = true
  required_checks = [
    "plan-github-setup / Plan",
    "lint-code / lint-code",
    "run-tests / run-tests",
    "create-release-dry-run / create-release-dry-run",
    "lint-commits / lint-commits",
  ]
}
