#! /bin/sh

netlify-lambda build app/lambda && \
truffle compile && \
truffle migrate --network ropsten --reset && \
npm run-script build
