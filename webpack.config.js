const path = require('path');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

const config = {
  entry: path.resolve(__dirname, 'dist/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundles/ic-datepicker.bundle.js',
    libraryTarget: 'umd'
  },
  externals: [nodeExternals()],
  plugins: [
    new UglifyJsPlugin({
      beautify: false,
      output: {
        comments: false
      },
      mangle: {
        screw_ie8: true
      },
      compress: {
        screw_ie8: true,
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false
      },
    })
  ]
};

module.exports = config;
