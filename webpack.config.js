/* eslint-disable */

var webpack = require('webpack');

var config = {
  context: __dirname,

  entry: {
    javascript: ['whatwg-fetch', './src/index.js'],
    html: './src/index.html',
  },

  output: {
    filename: 'index.js',
    path: './dist'
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'file?name=[name].[ext]',
      },
    ],
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      })
    ]
  },

  devtool: 'source-map'
};

module.exports = config;
