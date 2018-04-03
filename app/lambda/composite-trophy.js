import download from './lib/download'
import tmp from 'tmp'
import Jimp from 'jimp'

var LOG_ID = 'CompositeTrophy'

function log(string) {
  console.log(`${LOG_ID}: ${string}`)
}

exports.handler = function(event, context, callback) {
  log(`Entry`)

  var bodyUrl = `${process.env.IMAGES_URL}/cup-default-pink.png`
  var armsUrl = `${process.env.IMAGES_URL}/arms-default-pink.png`

  log(`Downloaded images`)

  Jimp.read(bodyUrl)
    .then((bodyImage) => {

      log(`Read body image`)

      Jimp.read(armsUrl)
        .then((armsImage) => {

          log(`Read arms image`)

          bodyImage.composite(armsImage, 0, 0)

          log(`composited`)

          callback(null, {
            statusCode: 200,
            body: `Composite result: ${bodyImage.bitmap.data.length}`
          })
          /*
          bodyImage.getBuffer( Jimp.MIME_PNG, (error, outputBuffer) => {
            let response
            if (error) {
              response = {
                statusCode: 500,
                body: error
              }
            } else {
              response = {
                statusCode: 200,
                headers: {'Content-type' : 'image/png'},
                body: outputBuffer
              }
            }
            callback(null, response)
          })
          */
        })
        .catch(error => {
          callback(null, {
            statusCode: 500,
            body: `Was unable to read arms image: ${error}`
          })
        })
    })
    .catch(error => {
      callback(null, {
        statusCode: 500,
        body: `Could not read body image: ${error}`
      })
    })
}
