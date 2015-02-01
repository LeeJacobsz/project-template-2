// Require

var gulp 		= require('gulp');
var gutil 		= require('gulp-util');
var sass 		= require('gulp-sass');
var uglify 		= require('gulp-uglify');
var bourbon 	= require('node-bourbon');
var minifyCSS 	= require('gulp-minify-css');
var concat 		= require('gulp-concat');
var prefix     = require('gulp-autoprefixer');
var lr 		   = require('gulp-livereload');

// Helpers

function errorReporter (err){
  gutil.log( gutil.colors.red("Error: ") + gutil.colors.yellow(err.plugin) + "\n" + err.message);
  return this.emit('end');
};

// Tasks

gulp.task('sass', function(){
	gulp.src('src/styles/style.scss')
	.pipe(sass({ includePaths: bourbon.includePaths }))
	.on('error', errorReporter)
	.pipe(prefix({ versions: "last 2" }))
	.pipe(minifyCSS({keepBreaks:true}))
	.pipe(gulp.dest('public/assets/css/'));
});

gulp.task('scripts', function() {
	gulp.src([   // Order is important! setup first, init last.
		'src/scripts/setup.js',
		'src/scripts/controllers/*.js',
		'src/scripts/widgets/*.js',
   	'src/scripts/init.js' ])
	.pipe(concat('main.js'))
	.pipe(gulp.dest('public/assets/js'))
	.pipe(concat('main.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('public/assets/js'));
});

gulp.task('concat-libs', function(){
	gulp.src([ 'src/libs/*.js', '!src/libs/modernizr.js' ])
	.pipe(concat('plugins.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('public/assets/js'));
});

gulp.task('minify-libs', function(){
	gulp.src([ 'src/libs/modernizr.js' ])
	.pipe(uglify())
	.pipe(gulp.dest('public/assets/js'));
});

gulp.task('libs', [ 'concat-libs', 'minify-libs' ], function () {});

gulp.task('default', [ 'sass', 'scripts', 'libs' ], function () {
	lr.listen();
	gulp.watch(['src/styles/**/*.scss'], ['sass']);
	gulp.watch(['src/scripts/**/*.js'], ['scripts']);
	gulp.watch(['src/libs/**/*.js'], ['libs']);
	gulp.watch('public/assets/**/*').on('change', lr.changed).on('error', errorReporter);
});


