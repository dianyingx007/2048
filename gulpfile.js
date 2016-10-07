var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('scripts',function(){
    gulp.src(['./js/game.js','./js/keydown.js','./js/animation.js','./js/button.js','./js/mobile.js'])
        .pipe(concat('2048.js'))
        .pipe(gulp.dest('./js'))
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
});

gulp.task('default',function(){
    gulp.run('scripts');
    gulp.watch(['./js/game.js','./js/keydown.js','./js/animation.js','./js/button.js','./js/mobile.js'],function(){
        gulp.run('scripts');
    });
});