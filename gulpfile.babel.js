'use strict';

import del from 'del';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import mjml from 'gulp-mjml';
import htmlmin from 'gulp-htmlmin';

const server = browserSync.create();

const paths = {
	scripts: {
	  src: 'src/templates/**/*.mjml',
	  dest: 'dist/'
	}
  };

const clean = () => del(['dist']);

//convert mjml files to html
function scripts() {
	var out = gulp.src(paths.scripts.src).pipe(mjml());
	// out.pipe(htmlmin({ collapseWhitespace: true }));
	return out.pipe(gulp.dest(paths.scripts.dest));
}

//copy images
function images() {
	return gulp.src('src/templates/**/*.{jpg,png,gif,svg}').pipe(gulp.dest(paths.scripts.dest));
}

//initial serve reload
function reload(done) {
	server.reload();
	done();
}
  
//setting up server directory
function serve(done) {
	server.init({
		server: {
			baseDir: './dist'
	  	}
	});
	done();
}
  
const watch = () => gulp.watch(paths.scripts.src, gulp.series(scripts, reload));
  
const dev = gulp.series(clean, scripts, images, serve, watch);

export default dev;
exports.dev = dev;
exports.images = images;