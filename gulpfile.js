// Require

var gulp    = require('gulp'),
    gutil   = require('gulp-util'),
    sass    = require('gulp-sass'),
    uglify  = require('gulp-uglify'),
    cssmin  = require('gulp-minify-css'),
    concat  = require('gulp-concat'),
    prefix  = require('gulp-autoprefixer'),
    lr      = require('gulp-livereload'),
    bourbon = require('node-bourbon');


// Helpers

function prettyLog (label, text) {
  gutil.log( gutil.colors.bold("  " + label + " | ") + text );
}

function errorReporter (err){
  gutil.log( gutil.colors.red("Error: ") + gutil.colors.yellow(err.plugin) );
  if (err.message)    { prettyLog("message", err.message); }
  if (err.fileName)   { prettyLog("in file", err.fileName); }
  if (err.lineNumber) { prettyLog("on line", err.lineNumber); }
  return this.emit('end');
};


// Tasks

gulp.task('sass', function(){
  gulp.src('src/styles/style.scss')
  .pipe(sass({ includePaths: bourbon.includePaths }).on('error', errorReporter))
  .pipe(prefix({ versions: [ "last 2 versions" ] }))
  .pipe(cssmin({ keepBreaks: true }))
  .pipe(gulp.dest('public/assets/css/'));
});

gulp.task('scripts', function() {
  gulp.src([
    'src/scripts/setup.js',
    'src/scripts/controllers/*.js',
    'src/scripts/widgets/*.js',
    'src/scripts/init.js' ])   // Order is important! setup first, init last.
  .pipe(concat('main.js'))
  .pipe(gulp.dest('public/assets/js'))
  .pipe(concat('main.min.js'))
  .pipe(uglify().on('error', errorReporter))
  .pipe(gulp.dest('public/assets/js'));
});

gulp.task('concat-libs', function(){
  gulp.src([ 'src/libs/*.js', '!src/libs/modernizr.js' ])
  .pipe(concat('libs.min.js'))
  .pipe(gulp.dest('public/assets/js'))   // Dump before minifiying - if uglify works, this will be overwritten immediately, but if not, it gives you something in which to look up errors by line number
  .pipe(uglify().on('error', errorReporter))
  .pipe(gulp.dest('public/assets/js'));
});

gulp.task('minify-libs', function(){
  gulp.src([ 'src/libs/modernizr.js' ])
  .pipe(uglify().on('error', errorReporter))
  .pipe(gulp.dest('public/assets/js'));
});

gulp.task('libs', [ 'concat-libs', 'minify-libs' ], function () {});

gulp.task('default', [ 'sass', 'scripts', 'libs' ], function () {
  lr.listen();
  gulp.watch(['src/styles/**/*.scss'], ['sass']);
  gulp.watch(['src/scripts/**/*.js'], ['scripts']);
  gulp.watch(['src/libs/**/*.js'], ['libs']);
  gulp.watch('public/assets/**/*').on('change', lr.changed).on('error', errorReporter);
  gulp.watch('public/html/**/*.php').on('change', lr.changed).on('error', errorReporter);
});


