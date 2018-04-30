var Registry = artifacts.require('Registry')

module.exports = async function(deployer) {
  await deployer.deploy(Registry)
};
