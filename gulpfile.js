require('coffee-script/register');
var gulp = require('gulp');
var path = require('path');
var mocha = require('gulp-mocha');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var env = process.ENV || 'development';


gulp.task('test', function () {
  return gulp.src('test/**/*.coffee')
    .pipe(mocha({ reporter: 'spec' }));
});


gulp.task('sass', function () {
  return gulp.src(
    path.join(__dirname, 'client', 'app', 'scss') + '/*.scss'
  )
    .pipe(sass())
    .pipe(gulp.dest(
      path.join(__dirname, 'client', 'assets', 'app')
    ));
});

gulp.task('vendor', function () {
  var base = path.join(__dirname, 'client', 'assets', 'vendor') + '/';

  return gulp.src([
    base + 'bootstrap.min.css',
    base + 'flat-ui.css',
    base + 'bootstrap-social.css',
    base + 'boostrap-datetimepicker'
  ])
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(path.join(__dirname, 'public', 'stylesheets') + '/'))
});

gulp.task('css', ['sass', 'vendor'], function () {
  return gulp.src(
    path.join(__dirname, 'client', 'assets', 'app') + '/*.css'
  )
    .pipe(concat('app.css'))
    .pipe(gulp.dest(path.join(__dirname, 'public', 'stylesheets')))
});

gulp.task('scripts', function() {
  return gulp.src('./lib/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'))
});
