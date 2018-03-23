#! /bin/sh
watchman-make -p 'app/**' 'contracts/**' 'test/**' --make=truffle -t 'compile && truffle test'
