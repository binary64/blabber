#!/bin/sh
set -e

echo "Ensuring dist/apps/blabber exists..."
if [ ! -d "dist/apps/blabber" ]; then
  echo "dist/apps/blabber does not exist"
  exit 1
fi

mv -T dist/apps/blabber/.next dist/apps/blabber/next || true

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
