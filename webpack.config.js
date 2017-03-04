const path = require('path');
const config = {
  entry: path.resolve(__dirname, 'dist/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundles/ic-datepicker.bundle.js',
    libraryTarget: 'umd'
  }
};

module.exports = config;
