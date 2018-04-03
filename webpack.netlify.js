const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.EnvironmentPlugin(['IMAGES_URL'])
  ]
}
