import assertRevert from './support/assert-revert'
import BigNumber from 'bignumber.js'
import range from 'lodash.range'
import stringTo32Bytes from '../app/javascripts/string-to-32bytes'

const Registry = artifacts.require('Registry')
const Delegate = artifacts.require('Delegate')
const CryptoTrophies = artifacts.require('CryptoTrophies')
const ICryptoTrophies = artifacts.require('ICryptoTrophies')

contract('Delegate', function (accounts) {
  let registry
  let delegate

  beforeEach(async function () {
    registry = await Registry.new()
    delegate = await Delegate.new(registry.address, stringTo32Bytes('TheKey'))
  })

  describe('register', () => {
    it('should register the contract correctly', async () => {
      let instance = await CryptoTrophies.new()
      let key = stringTo32Bytes('CryptoTrophiesTarget')
      await registry.register(key, instance.address)
      let delegate = await Delegate.new(registry.address, key)
      let icryptoTrophies = await ICryptoTrophies.at(delegate.address)
      assert.equal((await icryptoTrophies.myAwards()).length, 0)
      await icryptoTrophies.buyAward(1, "Titleasdf", "Descriptionasdfasdf", accounts[1])
      
    })
  })
})
