const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

//Static server
gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: "../adaptive-landing-demo"
    }
  });
});

gulp.task('styles',function() {
  return gulp.src("../adaptive-landing-demo/sass/*.+(scss|sass)")
  .pipe(sass({outputStyle: "compressed"}).on('error',sass.logError))
  .pipe(rename({
    prefix: "",
    suffix: ".min"
  }))
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 2 versions'],
    cascade: false
  }))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(gulp.dest("../adaptive-landing-demo/css"))
  .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  gulp.watch("../adaptive-landing-demo/sass/*.+(scss|sass)", gulp.parallel('styles'))
  gulp.watch("../adaptive-landing-demo/*.html").on("change", browserSync.reload);
})

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));