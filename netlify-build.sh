#! /bin/sh

./lambda-build.sh && \
truffle compile && \
truffle migrate --network ropsten --reset && \
npm run-script build
