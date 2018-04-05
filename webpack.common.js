const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
require("@babel/register")
require("@babel/polyfill")

module.exports = {
  entry: ['@babel/polyfill', './app/javascripts/app.js'],
  externals: {
    sharp: 'commonjs sharp'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },
  plugins: [
    // Copy our app's index.html to the build folder.
    new CopyWebpackPlugin([
      { from: './app/*.html', flatten: true },
      { from: './app/images', to: 'images/' }
    ]),
    new webpack.EnvironmentPlugin({
      CRYPTOTROPHY_CONTRACT_ADDRESS_FOR_NETWORK_1: '',
      CRYPTOTROPHY_CONTRACT_ADDRESS_FOR_NETWORK_3: '',
      CRYPTOTROPHY_CONTRACT_ADDRESS_FOR_NETWORK_1234: ''
    })
  ],
  module: {
    rules: [
      {
       test: /\.css$/,
       use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.css', '.js', '.jsx', '.json'],
  },
  devServer: {
    historyApiFallback: true
  }
}


// query: {
//   plugins: ['transform-runtime']
// }
