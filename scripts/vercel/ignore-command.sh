#!/usr/bin/env bash
# Vercel Ignored Build Step
# Exit 0 = skip build, Exit 1 = proceed with build
# https://vercel.com/docs/projects/overview#ignored-build-step

# Globs/paths that should trigger a deployment.
# Uses git pathspec patterns — supports wildcards.
TRIGGERS=(
  'src/**'
  'public/**'
  'package.json'
  'package-lock.json'
  '*.config.*'
  'tsconfig.json'
  'vercel.json'
)

git diff --quiet HEAD^ HEAD -- "${TRIGGERS[@]}"
