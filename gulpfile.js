const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');
const csso = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');
const del = require('del');
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
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
};

const images = () => {
  return gulp.src('source/images/**/*.{jpg,png}')
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.mozjpeg({
        quality: 75,
        progressive: true
      })
    ]))
    .pipe(gulp.dest('source/tempImages'))
    .pipe(webp({
      quality: 75,
      preset: "photo"
    }))
    .pipe(gulp.dest('source/tempImages'))
};

const sprite = () => {
  return gulp.src('source/images/**/*.svg')
    .pipe(imagemin([
      imagemin.svgo()
    ]))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('source/tempImages'))
};

const copy = () => {
  gulp.src('source/fonts/*.{woff,woff2}')
    .pipe(gulp.dest('build/fonts'));

  gulp.src('source/js/*.js')
    .pipe(gulp.dest('build/scripts'));

  gulp.src('source/lib/*.css')
    .pipe(csso())
    .pipe(gulp.dest('build/css'));

  gulp.src('source/tempImages/*.{jpg,png,webp,svg}')
    .pipe(gulp.dest('build/images'));

  gulp.src('source/icons/*')
    .pipe(gulp.dest('build/icons'));

  return gulp.src('source/*.html')
    .pipe(gulp.dest('build/'));
}

const cleanBuild = () => {
  return del('build');
};

const cleanTemp = () => {
  return del('source/tempImages');
};

const server = () => {
  browserSync.init({
    server: {
      baseDir: 'build/'
    }
  });

  gulp.watch('source/sass/**/*.{sass,scss}', gulp.series(css));
  gulp.watch('source/*.html').on('change', browserSync.reload);
};

exports.build = gulp.series(cleanBuild, css, copy);
exports.start = gulp.series(cleanBuild, css, copy, server);
exports.images = gulp.series(cleanTemp, gulp.parallel(images, sprite));
