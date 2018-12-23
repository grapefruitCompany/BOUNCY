var gulp = require("gulp");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var browserSync = require("browser-sync");
var plumber = require("gulp-plumber");
var autoprefixer = require("gulp-autoprefixer");

/*
npm i gulp@3.9.1
npm install node-sass gulp-sass --save-dev
npm install --save-dev gulp-watch
npm install --save-dev gulp-rename
npm install browser-sync gulp --save-dev
npm install --save-dev gulp-plumber
npm install --save-dev gulp-autoprefixer
*/

gulp.task('sass', function(){
  gulp.src('src/scss/main.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(rename('style.css'))
    .pipe(autoprefixer({
      browsers: ['> 0.2%', 'last 2 versions', 'not dead'],
      cascade: false
    }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser', function(){
  browserSync({
    server: {
      baseDir: 'src'
    },
    notify: false
  });
});

gulp.task('watch', ['sass', 'browser'], function(){
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/index.html', browserSync.reload);
});

gulp.task('default', ['watch']);

gulp.task('build', function () {
  gulp.src('src/css/style.css')
    .pipe(gulp.dest('build/css'));
  gulp.src('src/img/*.*')
    .pipe(gulp.dest('build/img'));
  gulp.src('src/index.html')
    .pipe(gulp.dest('build'));
});