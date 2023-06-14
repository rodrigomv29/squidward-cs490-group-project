#!/bin/bash

# Run yarn install
yarn install

# Run run-secret script
bash run-secret.sh

# Generate the prisma client
yarn rw prisma generate

# Generate the db and push the changes
yarn rw prisma db push
