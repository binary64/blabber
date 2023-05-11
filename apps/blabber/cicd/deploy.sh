#!/bin/sh
set -e

mv dist/apps/blabber/.next dist/apps/blabber/next
pnpm dlx vercel --cwd dist/apps/blabber --token "$VERCEL_TOKEN" deploy
