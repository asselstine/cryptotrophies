#! /bin/sh

npm test && \
./ganache.sh > /dev/null & truffle test && kill %- && \
./lambda-build.sh && \
truffle compile && \
truffle-migrate-off-chain --network ropsten && \
npm run build
