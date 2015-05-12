var gulp = require('gulp')
var connect  = require("gulp-connect");


gulp.task("watch", function () {
	gulp.watch("*.html", ["html"]);
	gulp.watch("css/*.css", ["css", "html"]);
	gulp.watch("js/*.js", ["js", "html"]);
})

gulp.task("connect", function(){
	return connect.server({
		port: 8080,
		livereload: true
	});
})

gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('./*.js')
    .pipe(connect.reload());
});

gulp.task('css', function () {
	gulp.src('./*.css')
		.pipe(connect.reload());
});

gulp.task("default", ["connect", "watch"]);