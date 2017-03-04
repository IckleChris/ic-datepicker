'use strict';

const path = require('path');

module.exports = (config) => {
  const configuration = {
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-webpack'),
      require('karma-spec-reporter'),
    ],
    reporters: ['spec'],
    specReporter: {
      maxLogLines: 5,
      suppressErrorSummary: false,
      suppressFailed: false,
      suppressPassed: false,
      suppressSkipped: true,
      showSpecTiming: true
    },
    files: [
      'test.ts'
    ],
    preprocessors: {
      'test.ts': ['webpack']
    },
    webpack: {
      resolve: {
        extensions: ['.ts', '.tsx', '.js']
      },
      module: {
        loaders: [
          { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
      }
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: 1,
    browserNoActivityTimeout: 10000,
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    }
  };

  config.set(configuration);
};
