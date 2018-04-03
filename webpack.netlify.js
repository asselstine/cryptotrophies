const webpack = require('webpack')

module.exports = {
  externals: {
    sharp: 'sharp'
  },
  plugins: [
    new webpack.EnvironmentPlugin(['IMAGES_URL'])
  ]
}
