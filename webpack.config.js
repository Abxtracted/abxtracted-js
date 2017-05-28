const webpack = require('webpack');

module.exports = {
  entry: {
    abxtracted: './src/abxtracted.js'
  },
  output: {
    library: 'Abx',
    libraryTarget: 'umd',
    filename: 'abxtracted.min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
};
