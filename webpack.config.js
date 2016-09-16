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
      {
        test: /\.global.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.css$/,
        exclude: [
          /node_modules/,
          /\.global.css$/
        ],
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        ],
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
