#!/bin/sh
set -e

mv dist/apps/blabber/.next dist/apps/blabber/next || true
npm i -g vercel
vercel --no-color --cwd dist/apps/blabber --local-config=apps/blabber/cicd/vercel.json --token "$VERCEL_TOKEN" link --yes
vercel --no-color --cwd dist/apps/blabber --local-config=apps/blabber/cicd/vercel.json --token "$VERCEL_TOKEN" deploy --yes --prod
