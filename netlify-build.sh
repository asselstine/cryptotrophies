#! /bin/sh

./ganache.sh &
npm test && \
truffle test && kill %- && \
./lambda-build.sh && \
truffle compile && \
# truffle-migrate-off-chain --network ropsten && \
npm run build
