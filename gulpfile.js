const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');
const csso = require('gulp-csso');
const browserSync = require('browser-sync').create();

const css = () => {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer('last 4 versions')
    ]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('source/css'))
    .pipe(browserSync.stream());
};

const server = () => {
  browserSync.init({
    server: {
      baseDir: 'source/'
    }
  });

  gulp.watch('source/sass/**/*.{sass,scss}', gulp.series(css));
  gulp.watch('source/*.html').on('change', browserSync.reload);
}

exports.start = gulp.series(css, server);
