#!/bin/bash
# Deploy via HTTPS using a GitHub token instead of SSH
export USE_SSH=false

# GitHub user and token
export GIT_USER="lkgarcia"
export GIT_PASS="$(cat token.txt)"

# Also set common token env vars for compatibility
export GITHUB_TOKEN="$(cat token.txt)"
export GH_TOKEN="$(cat token.txt)"

export CURRENT_BRANCH="main"
export GIT_USER_NAME="lkgarcia"
export GIT_USER_EMAIL="nicolo.kevin@gmail.com"