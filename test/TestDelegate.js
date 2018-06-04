import assertRevert from './support/assert-revert'
import BigNumber from 'bignumber.js'
import range from 'lodash.range'
import stringTo32Bytes from '../app/javascripts/string-to-32bytes'

const Registry = artifacts.require('Registry')
const Delegate = artifacts.require('Delegate')
const IvyAward = artifacts.require('IvyAward')
const IIvyAward = artifacts.require('IIvyAward')

contract('Delegate', function (accounts) {
  let registry
  let delegate

  beforeEach(async function () {
    registry = await Registry.new()
    delegate = await Delegate.new(registry.address, stringTo32Bytes('TheKey'))
  })

  describe('register', () => {
    it('should register the contract correctly', async () => {
      let instance = await IvyAward.new()
      let key = stringTo32Bytes('IvyAwardTarget')
      await registry.register(key, instance.address)

      let delegate = await Delegate.new(registry.address, key)
      let iIvyAward = await IIvyAward.at(delegate.address)
      assert.equal((await iIvyAward.issuedAwards()).length, 0)

      await iIvyAward.buyAward(1, "Titleasdf", "Descriptionasdfasdf", accounts[1], { value: web3.toWei(0.003) })
    })
  })
})
