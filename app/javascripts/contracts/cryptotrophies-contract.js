import contract from 'truffle-contract'
import cryptoTrophies from '../../../build/contracts/CryptoTrophies.json'

const CryptoTrophies = contract(cryptoTrophies)

export default function () {
  CryptoTrophies.setProvider(web3.currentProvider)
  CryptoTrophies.web3.eth.defaultAccount = web3.eth.accounts[0]
  return CryptoTrophies
}
