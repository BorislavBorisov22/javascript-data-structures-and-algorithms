const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

gulp.task('test', () => {
    return gulp.src('test/**/*.test.js')
        .pipe(mocha());
});

gulp.task('lint', () => {
    return gulp
        .src(['src/**/*.js', 'test/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
});

gulp.task('build', ['lint', 'test']);