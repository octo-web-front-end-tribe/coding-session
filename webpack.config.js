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
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      })
    ]
  }
};

module.exports = config;
