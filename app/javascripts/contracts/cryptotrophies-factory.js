import contract from 'truffle-contract'
import registry from '../../../build/contracts/Registry.json'
import iCryptoTrophies from '../../../build/contracts/ICryptoTrophies.json'
import stringTo32Bytes from '@/string-to-32bytes'

const Registry = contract(registry)
const ICryptoTrophies = contract(iCryptoTrophies)

export default async function () {
  Registry.setProvider(web3.currentProvider)
  Registry.web3.eth.defaultAccount = web3.eth.accounts[0]

  ICryptoTrophies.setProvider(web3.currentProvider)
  ICryptoTrophies.web3.eth.defaultAccount = web3.eth.accounts[0]

  let registry = await Registry.deployed()
  let address = await registry.lookup(stringTo32Bytes('CryptoTrophies'))

  return ICryptoTrophies.at(address)
}
