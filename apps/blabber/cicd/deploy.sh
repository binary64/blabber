#!/bin/sh
set -e

ls -al dist/apps/blabber

echo "Ensuring dist/apps/blabber exists..."
if [ ! -d "dist/apps/blabber" ]; then
  echo "dist/apps/blabber does not exist"
  exit 1
fi

echo "Ensuring Vercel token exists..."
if [ -z "$VERCEL_TOKEN" ]; then
  echo "VERCEL_TOKEN env var is not set"
  exit 1
fi

echo "Installing Vercel CLI..."
npm i -g vercel
echo "Installed!"

echo "Logging in..."
vercel --no-color --cwd=dist/apps/blabber --local-config=apps/blabber/cicd/vercel.json --token "$VERCEL_TOKEN" link --yes
ls -al dist/apps/blabber
# vercel --no-color --cwd=dist/apps/blabber --local-config=apps/blabber/cicd/vercel.json --token "$VERCEL_TOKEN" pull --yes
# ls -al dist/apps/blabber

echo "Logged in!"
echo "PWD: $PWD"
echo "Cat of dist/apps/blabber/.vercel/project.json :-"
cat dist/apps/blabber/.vercel/project.json || echo "(FILE NOT FOUND)"
echo "Installing node dependencies..."

echo "Building..."
vercel --no-color --cwd dist/apps/blabber --local-config=apps/blabber/cicd/vercel.json --token "$VERCEL_TOKEN" build --yes
echo "Built!"

echo "Deploying..."
vercel --no-color --cwd dist/apps/blabber --local-config=apps/blabber/cicd/vercel.json --token "$VERCEL_TOKEN" deploy --prebuilt
echo "Deployed!"
