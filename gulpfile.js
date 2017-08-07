var gulp = require('gulp');

// This task generates a new service worker script
gulp.task('generate-service-worker', function(callback) {
  var swPrecache = require('sw-precache');
  var rootDir = 'web';

  swPrecache.write(`${rootDir}/service-worker.js`, {
    // We cache all static files in the web directory with these extensions
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,jpeg,JPG,gif,svg,eot,ttf,woff}'],
    stripPrefix: rootDir,
    verbose: true,

    // Include any remote resources here, like 3rd-party javascript libraries
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/unpkg\.com\//,
        handler: 'networkFirst'
      },
      {
        urlPattern: /^https:\/\/www\.gstatic\.com\//,
        handler: 'networkFirst'
      },
      {
        urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\//,
        handler: 'networkFirst'
      },
    ],
  }, callback);
});

gulp.task('default', ['generate-service-worker']);
