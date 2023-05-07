#!/bin/bash
set -e

# Install the Fly CLI
curl -L https://fly.io/install.sh | sh
export FLYCTL_INSTALL="$HOME/.fly"
export PATH="$FLYCTL_INSTALL/bin:$PATH"

# Update the infra deployment according to fly.toml
fly deploy --config services/api/cicd --access-token "$FLY_API_TOKEN" --auto-accept

pnpm hasura --skip-update-check --no-color deploy --disable-interactive
