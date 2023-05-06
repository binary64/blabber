#!/bin/bash

# Update the infra deployment according to fly.toml
fly deploy

# Install the Hasura CLI
curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash

