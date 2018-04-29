#! /bin/sh

./lambda-build.sh && \
truffle compile && \
if [ -n "$BRANCH" ]
then
  if [ "$BRANCH" == "master" ]
  then
    truffle-migrate-off-chain --network ropsten && \
  fi
fi
npm run build
