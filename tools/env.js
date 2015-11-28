var prod = process.env.NODE_ENV === 'production';
var webpackDevServerPort = 3001;
var webpackDevServerUrl = 'http://localhost:' + webpackDevServerPort;
var assetsDir = '/assets/';
module.exports = {
	prod : prod,
	assetsDir : assetsDir,
	assetsUrl: (prod ? '' : 'http://localhost:' + webpackDevServerPort ) + assetsDir,
	webpackDevServerPort : webpackDevServerPort,
	webpackDevServerUrl : webpackDevServerUrl
}