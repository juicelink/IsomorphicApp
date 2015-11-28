var gulp = require('gulp');
var gutil = require("gulp-util");
var path = require('path');
var nodemon = require('nodemon');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var configs = require('./webpack.configs');
var env = require('./tools/env');

function onBuild(done){
	return function(err, stats) {
	    if(err) throw new gutil.PluginError("webpack", err);
	    gutil.log('[webpack]', stats.toString({
	        colors: true
	    }));
		done && done();
	}
}

function build(config, done) {
	return function(done){
		webpack(config).run(onBuild(done));
	}	
}

function watch(config, done) {
	return function(){
		webpack(config).watch(100, onBuild(done));
	}	
}

gulp.task('build-server', build(configs.server));
gulp.task('build-client', build(configs.client));

gulp.task('watch-server', watch(configs.server, nodemon.restart));

gulp.task('watch-client',  function() {
  new WebpackDevServer(webpack(configs.client), configs.devServer)
  	.listen(env.webpackDevServerPort, 'localhost', function (err, result) {
	    if(err) throw new gutil.PluginError('webpack-dev-server', err);
	    else {
	      gutil.log('[webpack-dev-server]', 'started');
	    }
	  });
});

gulp.task('build', ['build-client'], build(configs.server));
gulp.task('watch', ['watch-server', 'watch-client']);

gulp.task('run', ['watch'], function() {
  nodemon({
    execMap: {
      js: 'node'
    },
    script: path.join(__dirname, 'build/server.js'),
    ignore: ['*'],
    watch: ['foo/'],
    ext: 'noop'
  }).on('restart', function() {
  	gutil.log('[nodemon]', 'server restarted!');
  });
});