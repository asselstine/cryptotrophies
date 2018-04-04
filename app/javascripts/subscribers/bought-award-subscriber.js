import CryptoTrophies from '@/contracts/cryptotrophies-factory'

export default class {
  constructor (onBuyCallback) {
    CryptoTrophies().then((instance) => {
      this.boughtTrophyEvent = instance.BoughtAward({ buyer: web3.eth.accounts[0] })
      this.boughtTrophyEvent.watch((error, result) => {
        if (!error) {
          onBuyCallback()
          console.log(result)
        } else {
          console.error(error)
        }
      })
    })
  }

  stop () {
    this.boughtTrophyEvent.stopWatching()
  }
}
