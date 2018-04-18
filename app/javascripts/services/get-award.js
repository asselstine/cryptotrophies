import CryptoTrophies from '@/contracts/cryptotrophies-factory'

export default function (awardId) {
  var contract = CryptoTrophies()

  var awardType = new Promise((resolve, reject) => {
    contract.then((instance) => {
      instance.getAwardType(awardId).then((response) => {
        resolve(parseInt(response.toString()))
      }).catch((error) => reject)
    })
  })

  var awardTitle = new Promise((resolve, reject) => {
    contract.then((instance) => {
      instance.getAwardTitle(awardId).then((response) => {
        resolve(response.toString())
      }).catch((error) => reject)
    })
  })

  var awardInscription = new Promise((resolve, reject) => {
    contract.then((instance) => {
      instance.getAwardInscription(awardId).then((response) => {
        resolve(response.toString())
      }).catch((error) => reject)
    })
  })

  var awardRecipient = new Promise((resolve, reject) => {
    contract.then((instance) => {
      instance.getAwardRecipient(awardId).then((response) => {
        resolve(response.toString())
      }).catch((error) => reject)
    })
  })

  return Promise.all([
    awardType,
    awardTitle,
    awardInscription,
    awardRecipient
  ])
}
