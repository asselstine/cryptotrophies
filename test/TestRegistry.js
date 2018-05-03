import assertRevert from './support/assert-revert'
import BigNumber from 'bignumber.js'
import range from 'lodash.range'
import stringTo32Bytes from '../app/javascripts/string-to-32bytes'

const Registry = artifacts.require('Registry')
const IvyAward = artifacts.require('IvyAward')

contract('Registry', function (accounts) {
  let registry

  beforeEach(async function () {
    registry = await Registry.new()
  })

  describe('register', () => {
    it('should register the contract correctly', async () => {
      let instance = await IvyAward.new()
      let key = stringTo32Bytes('IvyAwardTarget')
      await registry.register(key, instance.address)
      assert.equal((await registry.lookup(key)), instance.address)
    })
  })
})
