const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso')
const replace = require('gulp-replace');
const concat = require('gulp-concat') 
const babel = require('gulp-babel');


function scss() {
	return src('src/**.scss') // source file
		.pipe(sass()) //scss -> css
		.pipe(csso()) // minify
		.pipe(concat('theme.css.liquid')) // + extension liquid
		.pipe(replace('"{{', '{{'))	
		.pipe(replace('}}"', '}}'))
		.pipe(dest('assets'))	// destination
}

function babeljs() {
	return src('./src/**.js')
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(concat('custom.js'))
		.pipe(dest('assets'))
}

exports.scss = scss
exports.babeljs = babeljs

exports.build = series(scss, babeljs)
exports.watch = function() {
	watch('./src/**.js', babeljs);
	watch('src/**.scss', scss)
}