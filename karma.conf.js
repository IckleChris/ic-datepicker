module.exports = function (config) {
  var _config = {

    frameworks: [ 'jasmine', 'karma-typescript' ],

    files: [
      { pattern: './index.spec.ts' },
      { pattern: './src/interfaces/**/*.+(ts|html)' },
      { pattern: './src/models/**/*.+(ts|html)' },
      { pattern: './src/services/**/*.+(ts|html)' },
    ],

    preprocessors: {
      "**/*.ts": [ 'karma-typescript' ]
    },

    karmaTypescriptConfig: {
      tsconfig: './tsconfig.test.json'
    },

    reporters: [ 'progress', 'karma-typescript' ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: [ 'Chrome' ],
    singleRun: true
  };

  config.set(_config);
};
