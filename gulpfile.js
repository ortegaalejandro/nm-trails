var gulp = require('gulp');

gulp.task('generate-service-worker', function(callback) {
  var swPrecache = require('sw-precache');
  var rootDir = 'web';

  swPrecache.write(`${rootDir}/dist/js/service-worker.js`, {
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
    stripPrefix: rootDir,
    verbose: true,
  }, callback);
});
