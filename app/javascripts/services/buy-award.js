import CryptoTrophies from '@/contracts/cryptotrophies-factory'

export default function (awardType, title, inscription) {
  CryptoTrophies().deployed().then((instance) => {
    instance.buyTrophy(awardType, title, inscription).then((result) => {
      console.log(result)
    }).catch((error) => {
      console.error(error)
    })
  }).catch((error) => {
    console.error(error)
  })
}
