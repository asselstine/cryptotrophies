import CryptoTrophies from '@/contracts/cryptotrophies-factory'

export default function (awardId) {
  var contract = CryptoTrophies()

  var awardType = new Promise((resolve, reject) => {
    contract.then((instance) => {
      instance.awardType(awardId).then((response) => {
        resolve(parseInt(response.toString()))
      }).catch((error) => reject)
    })
  })

  var awardTitle = new Promise((resolve, reject) => {
    contract.then((instance) => {
      instance.awardTitle(awardId).then((response) => {
        resolve(response.toString())
      }).catch((error) => reject)
    })
  })

  var awardInscription = new Promise((resolve, reject) => {
    contract.then((instance) => {
      instance.awardInscription(awardId).then((response) => {
        resolve(response.toString())
      }).catch((error) => reject)
    })
  })

  var awardRecipient = new Promise((resolve, reject) => {
    contract.then((instance) => {
      instance.awardRecipient(awardId).then((response) => {
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
