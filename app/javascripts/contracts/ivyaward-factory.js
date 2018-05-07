import contract from 'truffle-contract'
import registry from '../../../build/contracts/Registry.json'
import iIvyAward from '../../../build/contracts/IIvyAward.json'
import stringTo32Bytes from '@/string-to-32bytes'

const Registry = contract(registry)
const IIvyAward = contract(iIvyAward)

export default async function () {
  Registry.setProvider(web3.currentProvider)
  Registry.web3.eth.defaultAccount = web3.eth.accounts[0]

  IIvyAward.setProvider(web3.currentProvider)
  IIvyAward.web3.eth.defaultAccount = web3.eth.accounts[0]

  let registry = await Registry.deployed()
  let address = await registry.lookup(stringTo32Bytes('IvyAward'))

  return IIvyAward.at(address)
}
