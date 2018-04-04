#! /bin/sh

./lambda-build.sh && \
truffle compile && \
npm run build
