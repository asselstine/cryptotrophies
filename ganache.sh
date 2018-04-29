#! /bin/sh
$(npm bin)/ganache-cli --db .ganache -i 1234 -e 100 -a 10 -m "$HDWALLET_MNEMONIC"
