import CryptoTrophies from '@/contracts/cryptotrophies-factory'

export default class {
  constructor (onBuyCallback) {
    CryptoTrophies().then((instance) => {
      this.boughtTrophyEvent = instance.BoughtAward({ buyer: web3.eth.accounts[0] })
      this.boughtTrophyEvent.watch((error, result) => {
        if (!error) {
          onBuyCallback(result)
        } else {
          console.error(error)
        }
      })
    })
  }

  stop () {
    // Remove this and fix the racist condition ;)
    if (this.boughtTrophyEvent !== undefined)
      this.boughtTrophyEvent.stopWatching()
  }
}
