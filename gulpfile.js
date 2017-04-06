const gulp = require('gulp');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-csso');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('css', function(){
  return gulp.src('public/styles/*.css')
    .pipe(concat('styles.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('public/build/css'))
});

gulp.task('js', function() {
  gulp.src(['public/app.js', 'public/routes/routes.js', 'public/controllers/*.js'])
    .pipe(concat('scripts.min.js'))
    .pipe(babel({presets: ['es2015']}))
    .pipe(uglify())
    .on('error', function (err) { console.log(err.toString()); })
    .pipe(gulp.dest('public/build/js'))
});

gulp.task('default', [ 'css', 'js']);
