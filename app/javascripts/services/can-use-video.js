export default function () {
  return new Promise((resolve, reject) => {
    if (!window.navigator || !window.navigator.mediaDevices) {
      resolve(false)
    }
    else {
      resolve(true)
    }
  })
}
