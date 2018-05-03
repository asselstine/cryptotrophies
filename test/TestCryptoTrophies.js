import assertRevert from './support/assert-revert'
import BigNumber from 'bignumber.js'
import range from 'lodash.range'
const CryptoTrophies = artifacts.require('CryptoTrophies')

contract('CryptoTrophies', function (accounts) {
  var ct

  var user = accounts[0]
  var recipient = accounts[1]

  var title = 'I am a title'
  var inscription = 'i Mamm ni inscip'

  beforeEach(async function () {
    await CryptoTrophies.new().then(function (instance) {
      ct = instance
    })
  })

  describe('buyAward', () => {
    it('should fail when the title is bigger than the max size', () => {
      assertRevert(ct.buyAward(2, range(65).join(''), inscription, recipient))
    })

    it('should fail when the title is smaller than the min size', () => {
      assertRevert(ct.buyAward(2, 'a', inscription, recipient))
    })

    it('should fail when the inscription is bigger than the max size', () => {
      assertRevert(ct.buyAward(2, 'sasldk', range(257).join(''), recipient))
    })

    it('should fail when the recipient is zero', () => {
      assertRevert(ct.buyAward(2, 'aslfkejafea', range(257).join(''), 0))
    })

    it('should return 0 when no trophy', async () => {
      assert.equal((await ct.issuedAwards()).length, 0)
    })

    it('should emit the bought event', async () => {
      var transaction = await ct.buyAward(2, title, inscription, recipient)

      assert.equal(transaction.logs.length, 2)
      assert.equal(transaction.logs[1].event, 'BoughtAward')
      assert.equal(transaction.logs[1].args.awardId.toString(), '1')
    })

    it('should count trophies properly!', async () => {
      await ct.buyAward(3, title, inscription, recipient)
      var trophies = await ct.issuedAwards()
      assert.equal(trophies.length, 1)

      await ct.buyAward(1, title, inscription, recipient)
      assert.equal((await ct.issuedAwards()).length, 2)
    })
  })

  describe('awardType', () => {
    it('should return the type of the trophy', async () => {
      await ct.buyAward(3, title, inscription, recipient)
      var trophyType = await ct.awardType(1)
      assert.equal(trophyType.toString(), '3')
    })
  })

  describe('awardTitle', () => {
    it('should return the title', async () => {
      await ct.buyAward(3, title, inscription, recipient)
      assert.equal((await ct.awardTitle(1)), title)
    })
  })

  describe('awardInscription', () => {
    it('should return the inscription', async () => {
      await ct.buyAward(3, title, inscription, recipient)
      assert.equal((await ct.awardInscription(1)), inscription)
    })
  })

  describe('awardRecipient', () => {
    it('should return the recipient', async () => {
      await ct.buyAward(3, title, inscription, recipient)
      assert.equal((await ct.awardRecipient(1)), recipient)
    })
  })
})
