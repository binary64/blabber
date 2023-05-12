#!/bin/sh
set -e

mv dist/apps/blabber/.next dist/apps/blabber/next || true
pnpx vercel --local-config=apps/blabber/cicd/vercel.json --token "$VERCEL_TOKEN" deploy dist/apps/blabber --prod
