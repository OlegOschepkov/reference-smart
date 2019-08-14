var gulp = require('gulp');
var plumber = require('gulp-plumber');
var scss = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var server = require('browser-sync');
var minify = require('gulp-csso');
var rename = require('gulp-rename');
var image = require('gulp-imagemin');
var del = require('del');
var run = require('run-sequence');
var jsmin = require('gulp-jsmin');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var concat = require('gulp-concat');
var header = require('gulp-header');

gulp.task('styles', function () {
  gulp.src('source/scss/**/*.scss')
    .pipe(plumber())
    .pipe(gulp.dest('build/styles/scss'));
  gulp.src('source/scss/style.scss')
    .pipe(plumber())
    .pipe(scss())
    .pipe(postcss([
      autoprefixer({browsers: [
        'last 1 version',
        'last 2 Safari versions',
        'last 2 Chrome versions',
        'last 2 Firefox versions',
        'last 2 Opera versions',
        'last 2 Edge versions',
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/styles'))
    .pipe(server.reload({stream: true}));
  gulp.src('source/scss/plugins/*.css')
    .pipe(plumber())
    .pipe(postcss([
      autoprefixer({browsers: [
        'last 1 version',
        'last 2 Safari versions',
        'last 2 Chrome versions',
        'last 2 Firefox versions',
        'last 2 Opera versions',
        'last 2 Edge versions',
        'IE 11'
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(minify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/styles/plugins'))
    .pipe(server.reload({stream: true}));
});

gulp.task('jscript', function () {
  gulp.src('source/js/*.js')
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(header(' \'use strict\'; '))
    .pipe(gulp.dest('build/js/'))
    .pipe(server.reload({stream: true}));
});

gulp.task('jplugins', function (){
  gulp.src('source/js/plugins/*.js')
    .pipe(plumber())
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/js/plugins'));
  gulp.src('source/js/plugins/min/*.min.js')
    .pipe(gulp.dest('build/js/plugins'));
});

gulp.task('serve', function () {
  server.init({
    server: 'build',
    open: false
  });
  gulp.watch('source/{scss,components}/**/*.scss', ['styles']);
  gulp.watch('source/*.html', ['copyhtml']);
  gulp.watch('source/js/*.js', ['jscript']);
  gulp.watch('source/js/plugins/*.js', ['jplugins']);
  gulp.watch('source/img/*', ['images']);
  gulp.watch('source/img/sprite/*', ['symbols']);
});

gulp.task('images', function () {
  gulp.src('build/img/**/*.{png,jpg,gif}')
    .pipe(image({
      jpegRecompress: true,
      jpegoptim: true,
      mozjpeg: false
    }))
  .pipe(gulp.dest('build/img'));
  gulp.src('build/img/**/*.{png,jpg,gif}')
    .pipe(image({
      jpegRecompress: true,
      jpegoptim: true,
      mozjpeg: false
    }))
    .pipe(gulp.dest('build/img'));
});

gulp.task('svgs', function () {
  gulp.src('build/img/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('build/img'));
  gulp.src('build/img/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('build/img'));
});

gulp.task('symbols', function () {
  var cleanSymbols = del('build/sprite/sprite.svg');
  var svgs = gulp
    .src('source/img/sprite/*.svg')
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/sprite'));
  return gulp
    .src('build/*.html')
    .pipe(gulp.dest('build'));
});

gulp.task('copy', function () {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**/*',
    'source/video/*',
    'source/*.html',
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'));
});

gulp.task('copyhtml', function () {
  return gulp.src([
    'source/*.html'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'))
  .pipe(server.reload({stream: true}));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('debug', function (fn) {
  run(
    'clean',
    'copy',
    'symbols',
    'styles',
    'jscript',
    'jplugins',
    fn
  );
});

gulp.task('build', function (fn) {
  run(
    'clean',
    'copy',
    'symbols',
    'images',
    'svgs',
    'styles',
    'jscript',
    'jplugins',
    fn
  );
});
