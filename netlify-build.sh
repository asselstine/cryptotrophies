#! /bin/sh

truffle compile && truffle migrate --network ropsten && npm run-script build
