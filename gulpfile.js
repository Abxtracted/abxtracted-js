var gulp = require('gulp');
var replace = require('gulp-replace');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var config = require('./config');

gulp.task('webpack', function() {
  return gulp.src('./**/*.js')
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(replaceUrl())
    .pipe(gulp.dest('dist'));
});

function replaceUrl(){
  var env = process.env.NODE_ENV || 'development';
  var envConfig = config[env];
  return replace('${ABX_URL}', envConfig.url);
}

gulp.task('default', ['webpack']);
