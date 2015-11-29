var gulp = require('gulp');
var gutil = require("gulp-util");
var path = require('path');
var nodemon = require('nodemon');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var configs = require('./webpack.configs');
var env = require('./tools/env');
var del = require('del');

function onBuild(done){
	return function(err, stats) {
	    if(err) throw new gutil.PluginError("webpack", err);
	    gutil.log('[webpack]', stats.toString({
	        colors: true
	    }));
		done && done();
	}
}

function build(config, toRemove, done) {
	return function(done){
        toRemove && del.sync(toRemove);
		webpack(config).run(onBuild(done));
	}	
}

function watch(config, toRemove, done) {
    var firstDone = false;
	return function(cb){
        toRemove && del.sync(toRemove);
		webpack(config, cb).watch(100, onBuild(done));
	}	
}

var serverFiles = path.join(env.buildPath,'*.*');

gulp.task('build-server', build(configs.server, serverFiles));
gulp.task('build-client', build(configs.client, env.assetsPath));
gulp.task('build', ['build-client'], build(configs.server, serverFiles));

gulp.task('watch-client',  function(cb) {
  del.sync(env.assetsPath);
  new WebpackDevServer(webpack(configs.webpackDevServerClient, cb), configs.devServer)
  	.listen(env.webpackDevServerPort, 'localhost', function (err, result) {
	    if(err) throw new gutil.PluginError('webpack-dev-server', err);
	    else {
	      gutil.log('[webpack-dev-server]', 'started');
	    }
	  });
});

gulp.task('watch', ['watch-client'], watch(configs.server, serverFiles, nodemon.restart));

gulp.task('run', ['watch'], function() {
  nodemon({
    execMap: {
      js: 'node'
    },
    script: path.join(env.buildPath, env.serverEntryFile),
    ignore: ['*'],
    watch: ['foo/'],
    ext: 'noop',
  }).on('restart', function() {
    gutil.log('[nodemon]', 'server restarted!');
  });
});