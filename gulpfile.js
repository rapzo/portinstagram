require('coffee-script/register');
var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function () {
  return gulp.src('test/**/*.coffee')
    .pipe(mocha({ reporter: 'spec' }));
});