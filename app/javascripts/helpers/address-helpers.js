export function addressOrBlankString(address) {
  let hexAddress

  if (address && !web3.toBigNumber(address).isZero())
    hexAddress = address.toString()
  else
    hexAddress = 'n/a'

  return hexAddress
}
