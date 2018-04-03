import download from './lib/download'
import tmp from 'tmp'
import Jimp from 'jimp'

var LOG_ID = 'CompositeTrophy'

function log(string) {
  console.log(`${LOG_ID}: ${string}`)
}

exports.handler = function(event, context, callback) {
  log(`Entry`)

  var bodyFile = tmp.fileSync()
  var armsFile = tmp.fileSync()

  log(`Created tmp files ${bodyFile.name} and ${armsFile.name}`)

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

      log(`Downloaded images`)

      Jimp.read(bodyFile.name)
        .then((bodyImage) => {

          log(`Read body image`)

          callback(null, {
            statusCode: 200,
            body: 'Hello'
          })

          /*

          Jimp.read(armsFile.name)
            .then((armsImage) => {
              bodyImage.composite(armsImage, 0, 0)
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
            })
            .catch(error => {
              callback(null, {
                statusCode: 500,
                body: `Was unable to composite trophy: ${error}`
              })
            })
            */
        })
        .catch(error => {
          callback(null, {
            statusCode: 500,
            body: `Could not read bodyImage: ${error}`
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
