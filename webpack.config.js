// path is a default node utility for  for working with file and directory paths. It can be accessed using:
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: { main: './src/main.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      "Backbone": "backbone",
      "backbone": "backbone",
      "$": "jquery",
      "jquery": "jquery",
      "jQuery": "jquery",
      "window.jQuery": "jquery",
      "_": "underscore",
      "underscore": "underscore"
    })
  ]
};
