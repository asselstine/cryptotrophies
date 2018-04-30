import CryptoTrophies from '@/contracts/cryptotrophies-factory'

export default function (awardId, awardType, title, inscription, recipient) {
  return new Promise((resolve, reject) => {
    CryptoTrophies().then((instance) => {
      instance.updateAward(awardId, awardType, title, inscription, recipient).then((result) => {
        resolve(result)
      }).catch((error) => {
        reject(error)
      })
    }).catch((error) => {
      reject(error)
    })
  })
}
