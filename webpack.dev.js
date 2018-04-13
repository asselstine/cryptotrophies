const merge = require('webpack-merge')
const common = require('./webpack.common')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    // new BundleAnalyzerPlugin()
  ]
})
