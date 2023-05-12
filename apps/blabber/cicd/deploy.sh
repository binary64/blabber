#!/bin/sh
set -e

echo "Ensuring Vercel token exists..."
if [ -z "$VERCEL_TOKEN" ]; then
  echo "VERCEL_TOKEN env var is not set"
  exit 1
fi

echo "Installing Vercel CLI..."
npm i -g vercel
echo "Installed!"

echo "Logging in..."
vercel --no-color --cwd dist/apps/blabber --local-config=apps/blabber/cicd/vercel.json --token "$VERCEL_TOKEN" link --yes
echo "Logged in!"

echo "Deploying..."
vercel --no-color --cwd dist/apps/blabber --local-config=apps/blabber/cicd/vercel.json --token "$VERCEL_TOKEN" deploy --yes --prod
echo "Deployed!"
