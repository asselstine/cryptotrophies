import CryptoTrophies from '@/contracts/cryptotrophies-factory'

export default class {
  constructor (onBuyCallback) {
    CryptoTrophies().then((instance) => {
      this.boughtAwardEvent = instance.BoughtAward({ buyer: web3.eth.accounts[0] })
      this.boughtAwardEvent.watch((error, result) => {
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
    if (this.boughtAwardEvent !== undefined)
      this.boughtAwardEvent.stopWatching()
  }
}
