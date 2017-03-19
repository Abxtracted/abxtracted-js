const webpack = require('webpack');

module.exports = {
  entry: {
    abxtracted: "./src/abxtracted.js"
  },
  output: {
    library: "Abx",
    filename: "abxtracted.min.js"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
};
