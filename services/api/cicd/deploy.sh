#!/bin/bash
set -e

# Install the Fly CLI
curl -L https://fly.io/install.sh | sh
export FLYCTL_INSTALL="$HOME/.fly"
export PATH="$FLYCTL_INSTALL/bin:$PATH"

# Update the infra deployment according to fly.toml
fly --access-token "$FLY_API_TOKEN" deploy services/api/cicd

pnpm hasura --skip-update-check --no-color deploy --disable-interactive
