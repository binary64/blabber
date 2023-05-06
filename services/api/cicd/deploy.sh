#!/bin/bash
set -e

# Install the Fly CLI
curl -L https://fly.io/install.sh | sh
export FLYCTL_INSTALL="$HOME/.fly"
export PATH="$FLYCTL_INSTALL/bin:$PATH"

# Login to Fly
fly login --token "$FLY_API_TOKEN"

# Update the infra deployment according to fly.toml
fly deploy

pnpm hasura --skip-update-check --no-color deploy --disable-interactive
