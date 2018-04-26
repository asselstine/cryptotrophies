var Delegate = artifacts.require('Delegate')
var Registry = artifacts.require('Registry')

var stringTo32Bytes = require('../app/javascripts/string-to-32bytes').default

module.exports = function(deployer) {
  var delegateKey = stringTo32Bytes('CryptoTrophies')
  var targetKey = stringTo32Bytes('CryptoTrophiesTarget')
  Registry.deployed().then((registry) => {
    console.log('!!!!!!!!!!!!!!!!!!!!!!! ', registry.address, targetKey)
    deployer.deploy(Delegate, registry.address, targetKey)
      .then(() => {
        registry.register(delegateKey, Delegate.address)
      })
  })
}
