import IvyAward from '@/contracts/ivyaward-factory'

export default class {
  constructor (onUpdatedAwardCallback) {
    IvyAward().then((instance) => {
      this.updatedAwardEvent = instance.UpdatedAward({ updater: web3.eth.accounts[0] })
      this.updatedAwardEvent.watch((error, result) => {
        if (!error) {
          onUpdatedAwardCallback(result)
        } else {
          console.error(error)
        }
      })
    })
  }

  stop () {
    // Remove this and fix the racist condition ;)
    if (this.updatedAwardEvent !== undefined)
      this.updatedAwardEvent.stopWatching()
  }
}
