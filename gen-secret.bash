#!/bin/bash

# Check if .env file exists or SESSION_SECRET already exists
if [ -f .env ] && grep -q "SESSION_SECRET=" .env 2>/dev/null; then
  echo "Skipping secret generation. .env file or SESSION_SECRET already exists."
  exit 0
fi

# Generate the secret
secret=$(yarn rw g secret | head -n 2 | tr -d ' ' | tr -d '\n')

# Create or update the .env file
echo "SESSION_SECRET=$secret" > .env

echo "Secret generated and stored in .env file."

