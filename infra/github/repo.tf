module "repo" {
  source = "github.com/kad-products/platform//open-tofu/modules/github-repo?ref=v1.6.1"

  repo_name        = "rwsdk-jeopardy"
  repo_description = "Remake of Jeopardy using synced state for multi-device fun"
  required_checks  = ["Lint Code", "Run Tests"]
  is_product       = true
}
