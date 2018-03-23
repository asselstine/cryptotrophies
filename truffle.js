// Allows us to use ES6 in our migrations and tests.
require('babel-register')
require('babel-polyfill')
require('babel-node-modules')([
  'zeppelin-solidity'
])

var HDWalletProvider = require('truffle-hdwallet-provider')

var mnemonic = process.env.HDWALLET_MNEMONIC

module.exports = {
  networks: {
    ropsten: {
      provider: new HDWalletProvider(mnemonic, process.env.ROPSTEN_PROVIDER_URL),
      network_id: 3,
      gas: 4612388,
      gasPrice: 1000000000
    },

    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: 1234 // Match any network id
    }
  }
}
