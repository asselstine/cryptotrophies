#! /bin/sh

./lambda-build.sh && \
truffle compile && \
truffle-migrate-off-chain --network ropsten && \
npm run build
