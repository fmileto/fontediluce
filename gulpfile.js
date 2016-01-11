// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var del = require('del');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');


// tasks
gulp.task('lint', function () {
    gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('clean', function () {
    return del(['./dist/*']);
});

gulp.task('minify', function () {
    gulp.src('./app/index.html')
        .pipe(usemin({
            assetsDir: './app/',
            css: [minifyCSS(), 'concat'],
            js: [uglify(), 'concat']
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task("copy", function () {
    gulp.src(["./app/img/**/*"])
        .pipe(gulp.dest("./dist/img"));
    gulp.src(["./app/bower_components/font-awesome/fonts/*"])
        .pipe(gulp.dest("./dist/fonts"));
    gulp.src(["./app/video/**/*"])
        .pipe(gulp.dest("./dist/video"));
});

gulp.task('html', function () {
  gulp.src('./app/index.html')
    .pipe(connect.reload());
});

gulp.task('css', function () {
  gulp.src('./app/css/*.css')
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('./app/js/*.js')
    .pipe(connect.reload());
});
 
gulp.task('watch', function () {
  gulp.watch(['./app/index.html', './app/css/*.css', './app/js/*.js'], ['html', 'js', 'css']);
});

gulp.task('connect', function () {
    connect.server({
        root: 'app/',
        port: 8888,
        livereload: true,
        middleware: function (connect, o) {
            return [(function () {
                var url = require('url');
                var proxy = require('proxy-middleware');
                var options = url.parse('http://localhost:8080/api');
                options.route = '/api';
                return proxy(options);
            })()];
        }

    });
});

gulp.task('connectDist', function () {
    connect.server({
        root: 'dist/',
        port: 9999
    });
});

// default task
gulp.task('default',
    ['lint', 'connect', 'watch']
    );
gulp.task('build', function () {
    runSequence(['clean'],
        [
            'lint',
            'minify',
            'copy',
            'connectDist'
        ]
        );
});