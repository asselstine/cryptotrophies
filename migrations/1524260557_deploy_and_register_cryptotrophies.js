var CryptoTrophies = artifacts.require('./CryptoTrophies')
var Registry = artifacts.require('./Registry')

var stringTo32Bytes = require('../app/javascripts/string-to-32bytes').default

module.exports = async function(deployer) {
  // Use deployer to state migration tasks.
  await deployer.deploy(CryptoTrophies).then(() => {
    return Registry.deployed().then((registry) => {
      var key = stringTo32Bytes('CryptoTrophiesTarget')
      return registry.register(key, CryptoTrophies.address)
    }).catch((error) => {
      console.error(error)
    })
  }).catch((error) => {
    console.error(error)
  })
}
