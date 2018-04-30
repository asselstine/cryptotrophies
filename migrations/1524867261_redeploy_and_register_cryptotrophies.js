var Registry = artifacts.require('./Registry')
var CryptoTrophies = artifacts.require('./CryptoTrophies')
var deployAndRegister = require('./support/deploy-and-register')

module.exports = function(deployer) {
  deployAndRegister(deployer, CryptoTrophies, Registry, 'CryptoTrophiesTarget')
};
