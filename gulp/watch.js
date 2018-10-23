/*
  watch.js
  ===========
  watches sass/js/images
*/

const gulp = require('gulp');
const config = require('./config.json');

gulp.task('watch-sass', () => {
	return gulp.watch(`${config.paths.assets}sass/**`, { cwd: './' }, ['sass']);
});

gulp.task('watch-assets', () => {
	return gulp.watch([`${config.paths.assets}images/**`,
		`${config.paths.assets}javascripts/**`,
		`${config.paths.assets}mock-data/**`], { cwd: './' }, ['copy-assets']);
});
