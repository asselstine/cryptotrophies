var Registry = artifacts.require('./Registry')
var IvyAward = artifacts.require('./IvyAward')
var deployAndRegister = require('./support/deploy-and-register')

module.exports = function(deployer) {
  deployAndRegister(deployer, IvyAward, Registry, 'IvyAwardTarget')
};
