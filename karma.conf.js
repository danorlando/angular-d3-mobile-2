// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine','requirejs'],

    // list of files / patterns to load in the browser
    files: [

      { pattern: 'app/vendor/*.js', included: false },
      { pattern: 'app/vendor/**/*.js', included: false },
      { pattern: 'app/bower_components/**/*.js', included: false },
      { pattern: 'app/scripts/services/*.js', included: false },
      { pattern: 'test/spec/services/*.js', included: false },
      { pattern: 'app/scripts/controllers/*.js', included: false },
      { pattern: 'test/spec/controllers/*.js', included: false },
      { pattern: 'test/unit/*.js', included: false }


    //  'test/spec/main.js'
    ],

    // list of files / patterns to exclude
    exclude: [

    ],

    reporters: 'progress',

    // web server port
    port: 8080,

    runnerPort: 9898,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false

  });
};
