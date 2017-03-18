var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('compress', function() {
  gulp.src('src/**/*.js')
    .pipe(uglify())
    .pipe(concat('abxtracted.min.js'))
    .pipe(gulp.dest('dist'))
});
