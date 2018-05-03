import IvyAward from '@/contracts/ivyaward-factory'

export default function (awardType, title, inscription, recipient) {
  return new Promise((resolve, reject) => {
    IvyAward().then((instance) => {
      instance.buyAward(awardType, title, inscription, recipient).then((result) => {
        resolve(result)
      }).catch((error) => {
        reject(error)
      })
    }).catch((error) => {
      reject(error)
    })
  })
}
