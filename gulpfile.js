const gulp = require('gulp');
const replace = require('gulp-replace');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const config = require('./config');

gulp.task('webpack', function() {
  return gulp.src('./**/*.js')
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(replaceUrl())
    .pipe(gulp.dest('dist'));
});

function replaceUrl(){
  let env = process.env.NODE_ENV || 'development';
  let envConfig = config[env];
  return replace('${ABX_URL}', envConfig.url);
}

gulp.task('default', ['webpack']);
