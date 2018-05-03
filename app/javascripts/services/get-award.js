import IvyAward from '@/contracts/ivyaward-factory'

// TODO: Patch this so if getAwardTitle returns 0 then we err out
export default function (awardId) {
  var contract = IvyAward()

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
        // Empty string for title means this award doesn't exist in the Eth DB
        // (since we force a title for our awards)
        if (response.toString() === '') {
          reject("Title for award was empty (award doesn't exist in Ethereum DB?");
          return;
        }

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
