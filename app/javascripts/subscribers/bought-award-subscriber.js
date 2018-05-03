import IvyAward from '@/contracts/ivyaward-factory'

export default class {
  constructor (onBuyCallback) {
    IvyAward().then((instance) => {
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
