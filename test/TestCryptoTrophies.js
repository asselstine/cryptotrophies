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

  describe('updateAward', () => {

    let newAwardId;

    beforeEach(async function () {
      // pull recipient out here after we edit buyAward to accept optional recipient
      let newAwardTx = await ct.buyAward(2, title, inscription, recipient)
      newAwardId = newAwardTx.logs[0].args.awardId.toString()
    })

    it('should fail when the title is bigger than the max size', () => {
      assertRevert(ct.updateAward(newAwardId, range(65).join(''), inscription, recipient))
    })

    it('should fail when the title is smaller than the min size', () => {
      assertRevert(ct.updateAward(newAwardId, 'a', inscription, recipient))
    })

    it('should fail when the inscription is bigger than the max size', () => {
      assertRevert(ct.updateAward(newAwardId, 'sasldk', range(257).join(''), recipient))
    })

    it('should emit the updated event', async () => {
      var transaction = await ct.updateAward(newAwardId, title, inscription, recipient)

      assert.equal(transaction.logs.length, 1)
      assert.equal(transaction.logs[0].event, 'UpdatedAward')
      assert.equal(transaction.logs[0].args.awardId.toString(), '0')
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
      assert.equal((await ct.myAwards()).length, 0)
    })

    it('should emit the bought event', async () => {
      var transaction = await ct.buyAward(2, title, inscription, recipient)

      assert.equal(transaction.logs.length, 1)
      assert.equal(transaction.logs[0].event, 'BoughtAward')
      assert.equal(transaction.logs[0].args.awardId.toString(), '0')
    })

    it('should count trophies properly!', async () => {
      await ct.buyAward(3, title, inscription, recipient)
      var trophies = await ct.myAwards()
      assert.equal(trophies.length, 1)

      await ct.buyAward(1, title, inscription, recipient)
      assert.equal((await ct.myAwards()).length, 2)
    })
  })




  describe('getAwardType', () => {
    it('should return the type of the trophy', async () => {
      await ct.buyAward(3, title, inscription, recipient)
      var trophyType = await ct.getAwardType(0)
      assert.equal(trophyType.toString(), '3')
    })
  })

  describe('getAwardTitle', () => {
    it('should return the title', async () => {
      await ct.buyAward(3, title, inscription, recipient)
      assert.equal((await ct.getAwardTitle(0)), title)
    })
  })

  describe('getAwardInscription', () => {
    it('should return the inscription', async () => {
      await ct.buyAward(3, title, inscription, recipient)
      assert.equal((await ct.getAwardInscription(0)), inscription)
    })
  })

  describe('getAwardRecipient', () => {
    it('should return the recipient', async () => {
      await ct.buyAward(3, title, inscription, recipient)
      assert.equal((await ct.getAwardRecipient(0)), recipient)
    })
  })
})


/*
  let polystake;
  let validatorIndex;

  let validatorAddress = accounts[0]
  let withdrawalAddress = accounts[1]
  let userAddress = accounts[2]

  beforeEach(async function () {
    await CryptoTrophies.new().then(function (instance) {
      polystake = instance
    }).then(async () => {
      await polystake.newValidator(withdrawalAddress)
      validatorIndex = 0
    })
  })

  describe('newValidator()', function () {
    it('cannot create multiple validators for the same address', async function () {
      assertRevert(polystake.newValidator(withdrawalAddress))
    })
  })

  describe('deposit()', function () {
    it('validator should be able to deposit ether', async function () {
      await polystake.deposit(validatorIndex, { from: validatorAddress, value: 10 })
      let validator = await polystake.getValidator(validatorIndex)
      assert.equal(validator[2], 10)
    })

    it('validator cannot deposit more than once', async function () {
      await polystake.deposit(validatorIndex, { from: validatorAddress, value: 10 })
      // await assertRevert(polystake.deposit(validatorIndex, { from: validatorAddress, value: 20 }))
    })

    it('user cannot deposit unless validator has deposited', async function () {
      await assertRevert(polystake.deposit(validatorIndex, { from: userAddress, value: 20 }))
    })

    it('user can deposit ether', async function () {
      await polystake.deposit(validatorIndex, { from: validatorAddress, value: 10 })
      await polystake.deposit(validatorIndex, { from: userAddress, value: 9 })

      let validator = await polystake.getValidator(validatorIndex)
      assert.equal(validator[3], 9)
    })

    it('operator activates when user ether matches deposit', async function () {
      await polystake.deposit(validatorIndex, { from: validatorAddress, value: 10 })
      await polystake.deposit(validatorIndex, { from: userAddress, value: 10 })

      let validator = await polystake.getValidator(validatorIndex)
      assert.equal(validator[5], 0)
    })

    it('cannot deposit into a logged-in operator', async function () {
      await polystake.deposit(validatorIndex, { from: validatorAddress, value: 10 })
      await polystake.deposit(validatorIndex, { from: userAddress, value: 10 })

      await polystake.activate(validatorIndex)

      await assertRevert(polystake.deposit(validatorIndex, { from: userAddress, value: 10 }))
      await assertRevert(polystake.deposit(validatorIndex, { from: validatorAddress, value: 10 }))
    })
  })

  describe('logout()', function () {
    it('should create a fake deposit', async function () {
      await polystake.deposit(validatorIndex, { from: validatorAddress, value: 10 })
      await polystake.deposit(validatorIndex, { from: userAddress, value: 10 })
      let validator = await polystake.getValidator(validatorIndex)
      assert.equal(validator[4], 0)
      await polystake.activate(validatorIndex)
      await polystake.logout(validatorIndex)
      validator = await polystake.getValidator(validatorIndex)
      assert.equal(validator[4], 2)
      assert.equal(validator[5], 20)
      assert.equal(await polystake.interestRate(), 5)
      assert.equal(validator[6], 21)
    })
  })

  describe('withdraw()', function () {
    describe('stakerWithdrawal()', function () {
      it('should remove the stake and interest when active', async function () {
        let initialBalance = web3.eth.getBalance(userAddress)
        await polystake.deposit(validatorIndex, { from: validatorAddress, value: 100 })
        await polystake.deposit(validatorIndex, { from: userAddress, value: 100 })

        await polystake.activate(validatorIndex)
        await polystake.logout(validatorIndex)

        await polystake.withdraw(validatorIndex, { from: userAddress })
        assert.equal(
          web3.eth.getBalance(userAddress).mod(100000).toString(),
          initialBalance.plus(5).mod(100000).toString()
        )
      })

      it('should return the deposit if not active', async function () {
        let initialBalance = web3.eth.getBalance(userAddress)
        await polystake.deposit(validatorIndex, { from: validatorAddress, value: 100 })
        await polystake.deposit(validatorIndex, { from: userAddress, value: 90 })
        await polystake.withdraw(validatorIndex, { from: userAddress })
        assert.equal(
          web3.eth.getBalance(userAddress).mod(100000).toString(),
          initialBalance.mod(100000).toString()
        )
      })
    })

    describe('validatorWithdrawal', function () {
      xit('fill this out!')
    })
  })

  describe('getValidatorCount()', function () {
    it('should return the correct count', async function () {
      let validatorCount = await polystake.getValidatorCount()
      assert.equal(validatorCount, 1)
    })
  })
})
*/
