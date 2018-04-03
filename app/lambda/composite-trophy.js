import download from './lib/download'
import tmp from 'tmp'
import Jimp from 'jimp'

exports.handler = function(event, context, callback) {
  var bodyFile = tmp.fileSync()
  var armsFile = tmp.fileSync()

  var bodyUrl = `${process.env.IMAGES_URL}/cup-default-pink.png`
  var armsUrl = `${process.env.IMAGES_URL}/arms-default-pink.png`

  var bodyPromise = new Promise((resolve, reject) => {
    download(bodyUrl, bodyFile.name, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })

  var armsPromise = new Promise((resolve, reject) => {
    download(armsUrl, armsFile.name, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })

  Promise.all([bodyPromise, armsPromise])
    .then(res => {
      Jimp.read(bodyFile.name)
        .then((bodyImage) => {
          Jimp.read(armsFile.name)
            .then((armsImage) => {
              bodyImage.composite(armsImage, 0, 0)
              bodyImage.getBuffer( Jimp.MIME_PNG, (error, outputBuffer) => {
                let response = {
                  statusCode: 200,
                  headers: {'Content-type' : 'image/png'},
                  body: outputBuffer
                }
                callback(null, response)
              })
            })
            .catch(error => {
              callback(null, {
                statusCode: 500,
                body: `Was unable to composite trophy: ${error}`
              })
            })
        })
    })
    .catch(error => {
      callback(null, {
        statusCode: 500,
        body: `Was unable to create trophy: ${error}`
      })
    })
}
