var Delegate = artifacts.require('Delegate')
var Registry = artifacts.require('Registry')
var stringTo32Bytes = require('../app/javascripts/string-to-32bytes').default

module.exports = async function(deployer) {
  let delegateKey = stringTo32Bytes('CryptoTrophies')
  let targetKey = stringTo32Bytes('CryptoTrophiesTarget')
  deployer.then(function () {
    return Registry.deployed().then((registry) => {
      return deployer.deploy(Delegate, registry.address, targetKey).then(() => {
        return registry.register(delegateKey, Delegate.address)
      })
    })
  })
}
