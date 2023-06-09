#!/bin/bash
set -e

# Ensure FLY_API_TOKEN env var exists
if [ -z "$FLY_API_TOKEN" ]; then
  echo "FLY_API_TOKEN env var is not set"
  exit 1
fi

# Ensure HASURA_GRAPHQL_ADMIN_SECRET env var exists
if [ -z "$HASURA_GRAPHQL_ADMIN_SECRET" ]; then
  echo "HASURA_GRAPHQL_ADMIN_SECRET env var is not set"
  exit 1
fi

# Ensure HASURA_GRAPHQL_ENDPOINT env var exists
if [ -z "$HASURA_GRAPHQL_ENDPOINT" ]; then
  echo "HASURA_GRAPHQL_ENDPOINT env var is not set"
  exit 1
fi

# Install the Fly CLI
curl -L https://fly.io/install.sh | sh
export FLYCTL_INSTALL="$HOME/.fly"
export PATH="$FLYCTL_INSTALL/bin:$PATH"

# Update the infra deployment according to fly.toml
fly deploy --config services/api/cicd/fly.toml --access-token "$FLY_API_TOKEN" --auto-confirm --force-machines --remote-only

pnpm hasura --skip-update-check --no-color deploy --disable-interactive --project services/api
