#!/bin/bash
set -e

# Install the Fly CLI
curl -L https://fly.io/install.sh | sh

# Login to Fly
fly login --token "$FLY_API_TOKEN"

# Update the infra deployment according to fly.toml
fly deploy

pnpm hasura --skip-update-check --no-color deploy --disable-interactive
