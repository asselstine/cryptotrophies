var stringTo32Bytes = require('../../app/javascripts/string-to-32bytes').default

module.exports = async function (deployer, contract, registry, key) {
  await deployer.deploy(contract).then(() => {
    return registry.deployed().then((registryInstance) => {
      return registryInstance.register(stringTo32Bytes(key), contract.address)
    }).catch((error) => {
      console.error(error)
      throw error
    })
  }).catch((error) => {
    console.error(error)
    throw error
  })
}
