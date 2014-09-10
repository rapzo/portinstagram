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

console.log(path.join(__dirname, 'client') + '/*.scss');

gulp.task('sass', function () {
  return gulp.src(path.join(__dirname, 'client') + '/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/stylesheets/portinstagram'));
});

gulp.task('css', function () {
  return gulp.src(path.join(__dirname, 'public', 'stylesheets', '*.css'))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(path.join(__dirname, 'public', 'stylesheets')))
});

gulp.task('scripts', function() {
  return gulp.src('./lib/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'))
});
