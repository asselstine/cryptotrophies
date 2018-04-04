import contract from 'truffle-contract'
import cryptoTrophies from '../../../build/contracts/CryptoTrophies.json'

const CryptoTrophies = contract(cryptoTrophies)

export default async function () {
  CryptoTrophies.setProvider(web3.currentProvider)
  CryptoTrophies.web3.eth.defaultAccount = web3.eth.accounts[0]
  await CryptoTrophies.detectNetwork()

  switch (CryptoTrophies.network_id) {
    case 1:
      var address = process.env.CRYPTOTROPHY_CONTRACT_ADDRESS_FOR_NETWORK_1;
      break;
    case 3:
      address = process.env.CRYPTOTROPHY_CONTRACT_ADDRESS_FOR_NETWORK_3;
      break;
    default:
      address = process.env.CRYPTOTROPHY_CONTRACT_ADDRESS_FOR_NETWORK_1234;
  }

  // console.log(`Looking for ${address}`)

  if (address) {
    // console.log(`Using ${address}`)
    return CryptoTrophies.at(address)
  } else {
    // console.log(`Using default: "deployed()"`)
    return CryptoTrophies.deployed()
  }
}
