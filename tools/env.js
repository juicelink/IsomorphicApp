var prod = process.env.NODE_ENV === 'production';
var webpackDevServerPort = 3001;
var webpackDevServerUrl = 'http://localhost:' + webpackDevServerPort;
var path = require('path');
var assetsDir = '/assets/';
var buildPath = path.join(__dirname, '..', 'build');

module.exports = {
	prod : prod,
	assetsDir : assetsDir,
    assetsPath : path.join(buildPath, assetsDir),
    buildPath : buildPath,
    serverEntryFile: 'index.js',
	webpackDevServerAssetsUrl: 'http://localhost:' + webpackDevServerPort + assetsDir,
	webpackDevServerPort : webpackDevServerPort,
	webpackDevServerUrl : webpackDevServerUrl
}