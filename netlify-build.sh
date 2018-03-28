#! /bin/sh

truffle compile && \
truffle migrate --network ropsten --reset && \
npm run-script build && \
netlify-lambda build app/lambda
