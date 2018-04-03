#! /bin/sh

./lambda-build.sh && \
truffle compile && \
npm run-script build

# truffle migrate --network ropsten && \
