import assertRevert from './support/assert-revert'
import BigNumber from 'bignumber.js'
import range from 'lodash.range'
const IvyAward = artifacts.require('IvyAward')

contract('IvyAward', function (accounts) {
  let ct

  const USER = accounts[0]
  const RECIPIENT = accounts[1]

  const OTHER_USER = accounts[2]

  const GENES = 2

  const TITLE = 'I am a title'
  const INSCRIPTION = 'i Mamm ni inscip'

  const PRICE = { value: web3.toWei(0.003) }

  beforeEach(async function () {
    await IvyAward.new().then(function (instance) {
      ct = instance
    })
  })

  describe('updateAward', () => {

    let newAwardId;

    beforeEach(async function () {
      // pull recipient out of here after we edit buyAward to accept optional recipient:
      let newAwardTx = await ct.buyAward(GENES, TITLE, INSCRIPTION, RECIPIENT, PRICE)

      // first log is a mined Transfer transaction
      newAwardId = newAwardTx.logs[1].args.awardId.toString()
    })

    // it('should fail when the owner of the award differs from the person editing', () => {
      // assertRevert(ct.updateAward(newAwardId, genes, title, INSCRIPTION, RECIPIENT, { from: USER }))
    // })

    it('should fail when the title is bigger than the max size', () => {
      assertRevert(ct.updateAward(newAwardId, GENES, range(65).join(''), INSCRIPTION, RECIPIENT))
    })

    it('should fail when the title is smaller than the min size', () => {
      assertRevert(ct.updateAward(newAwardId, GENES, 'a', INSCRIPTION, RECIPIENT))
    })

    it('should fail when the inscription is bigger than the max size', () => {
      assertRevert(ct.updateAward(newAwardId, GENES, 'sasldk', range(257).join(''), RECIPIENT))
    })

    it('should emit the updated event on success', async () => {
      var transaction = await ct.updateAward(newAwardId, GENES, TITLE, INSCRIPTION, RECIPIENT)

      assert.equal(transaction.logs.length, 1)
      assert.equal(transaction.logs[0].event, 'UpdatedAward')
      assert.equal(transaction.logs[0].args.awardId.toString(), newAwardId)
    })
  })

  describe('buyAward', () => {
    it('should fail when the title is bigger than the max size', () => {
      assertRevert(ct.buyAward(GENES, range(65).join(''), INSCRIPTION, RECIPIENT, PRICE))
    })

    it('should fail when the title is smaller than the min size', () => {
      assertRevert(ct.buyAward(GENES, 'a', INSCRIPTION, RECIPIENT, PRICE))
    })

    it('should fail when the inscription is bigger than the max size', () => {
      assertRevert(ct.buyAward(GENES, 'sasldk', range(257).join(''), RECIPIENT, PRICE))
    })

    it('should fail when the price is too low', () => {
      assertRevert(ct.buyAward(GENES, TITLE, INSCRIPTION, RECIPIENT, { value: web3.toWei(0) }))
    })

    it('should fail when the recipient is zero', () => {
      assertRevert(ct.buyAward(GENES, 'aslfkejafea', range(257).join(''), 0, PRICE))
    })

    it('should return 0 when no trophy', async () => {
      assert.equal((await ct.issuedAwards()).length, 0)
    })

    it('should emit the bought event on success', async () => {
      var transaction = await ct.buyAward(GENES, TITLE, INSCRIPTION, RECIPIENT, PRICE)

      assert.equal(transaction.logs.length, 2)
      assert.equal(transaction.logs[1].event, 'BoughtAward')
      assert.equal(transaction.logs[1].args.awardId.toString(), '1')
    })

    it('should succeed even if no recipient supplied', async () => {
      var transaction = await ct.buyAward(GENES, TITLE, INSCRIPTION, 0, PRICE)
      assert.equal(transaction.logs[1].event, 'BoughtAward')
    })

    it('should count issuedAwards (purchase history) properly', async () => {
      await ct.buyAward(3, TITLE, INSCRIPTION, RECIPIENT, PRICE)
      var trophies = await ct.issuedAwards()
      assert.equal(trophies.length, 1)

      await ct.buyAward(1, TITLE, INSCRIPTION, RECIPIENT, PRICE)
      assert.equal((await ct.issuedAwards()).length, 2)
    })

    it('should count ownedAwards (actual ownership) properly', async () => {
      var emptyRecipient = 0
      await ct.buyAward(3, TITLE, INSCRIPTION, emptyRecipient, PRICE)
      var trophies = await ct.ownedAwards()
      assert.equal(trophies.length, 1)

      // still only 1 owned by this purchaser
      await ct.buyAward(1, TITLE, INSCRIPTION, RECIPIENT, PRICE)
      assert.equal((await ct.ownedAwards()).length, 1)
    })
  })

  describe('getAward', () => {
    it('should return the type and title of the award', async () => {
      await contract.buyAward(3, TITLE, INSCRIPTION, RECIPIENT, PRICE )
      let [awardType_, awardTitle_, awardInscription_, awardRecipient_] = await contract.getAward(FIRST_TOKEN_ID)

      assert.equal(awardType_.toString(), '3')
      assert.equal(awardTitle_, TITLE)
      assert.equal(awardInscription_, INSCRIPTION)
      assert.equal(awardRecipient_, recipient)
    })
  })

  describe('setCurrentPrice', () => {
    it('sets a new price which each token will cost', async () => {
      await contract.setCurrentPrice(400000, { from: USER })
      let price = await contract.getCurrentPrice()
      assert.equal('400000', price.toString())
    })

    it('fails to set new price when called by non-owner', async () => {
      assertRevert(contract.setCurrentPrice(400, { from: OTHER_USER }))

      let price = await contract.getCurrentPrice()
      assert.equal('3000000000000000', price.toString())
    })
  })

  describe('getCurrentPrice', () => {
    it('returns the price each token will cost', async () => {
      let price = await contract.getCurrentPrice()
      assert.equal('3000000000000000', price.toString())
    })
  })

})
