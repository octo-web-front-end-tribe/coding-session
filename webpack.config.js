/* eslint-disable */

var webpack = require('webpack');

var config = {
  context: __dirname,

  entry: {
    javascript: './src/index.js'
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
        loaders: ['babel?presets[]=es2015']
      }
    ],
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      })
    ]
  }
};

module.exports = config;
