const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
require("@babel/register")
require("@babel/polyfill")

module.exports = {
  entry: ['@babel/polyfill', './app/javascripts/app.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },
  plugins: [
    // Copy our app's index.html to the build folder.
    new CopyWebpackPlugin([
      { from: './app/*.html', flatten: true }
    ]),
    new webpack.EnvironmentPlugin(['IMAGES_URL'])
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
