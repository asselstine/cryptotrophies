#! /bin/sh

./lambda-build.sh && \
truffle compile && \
truffle migrate --network ropsten && \
npm run-script build
