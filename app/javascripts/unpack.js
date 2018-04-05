import Web3 from 'web3'
var web3 = new Web3()

export default function (uint256) {
  var hex = web3.toHex(uint256)
  var type = web3.toDecimal(`0x${hex.substring(2,4)}`)

  // based on type, unpack other variables

  return {
    type
  }
}
