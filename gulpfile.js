var gulp = require('gulp');

// This task generates a new service worker script
gulp.task('generate-service-worker', function(callback) {
  var swPrecache = require('sw-precache');
  var localRootDir = 'web';
  var onlineRootDir = '/nm-trails';

  swPrecache.write(`${localRootDir}/service-worker.js`, {
    // We cache all static files in the web directory with these extensions
    staticFileGlobs: [localRootDir + '/**/*.{js,html,css,png,jpg,jpeg,JPG,gif,svg,eot,ttf,woff,json}'],
    stripPrefix: localRootDir,
    replacePrefix: onlineRootDir,
    verbose: true,

    // Include any remote resources here, like 3rd-party javascript libraries
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/unpkg\.com\//,
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
