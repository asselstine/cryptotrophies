import _ from 'lodash'
import Web3 from 'web3'
var web3 = new Web3()

export default function (/* type, param1, param2, etc */) {
  var type = arguments[0]
  if (type > 255) { throw new Error('Type is too large') }
  var typeHex = web3.toHex(type)
  if (typeHex.length === 3) {
    typeHex = `0x0${typeHex[2]}`
  }
  return typeHex + new Array(63).join('0')
}
