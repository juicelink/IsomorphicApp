var webpack = require('webpack');
var path = require('path');
var merge = require('./tools/merge');
var env = require('./tools/env');
var fs = require('fs');
var AssetsPlugin = require('assets-webpack-plugin');

var nodeModules = require('./tools/nodeModules');

var prod = process.env.NODE_ENV === 'production';

var defaultConfig = {
  module: {
    loaders: [{
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loaders: [ 'babel']
        }]
  }
};

var devConfig = {
  devtool: '#source-map',
  debug : true
};

var buildPath = path.join(__dirname, 'build');
var assetsPath = path.join(buildPath, env.assetsDir);

var serverConfig = {
  module: {
    loaders: [{
          test: /\.json$/, loaders: ['json']}]
  },
  entry: ['./server/index'],
  target: 'node',
  output: {
    path: buildPath,
    filename: 'server.js',
  },
  externals: nodeModules,
  node: {
    __dirname: true,
    __filename: true
  },
  plugins: [
    new webpack.IgnorePlugin(/\.(scss)$/),
    new webpack.BannerPlugin('require("source-map-support").install();',
                             { raw: true, entryOnly: false })
  ]
}

var devServerConfig = {
};


var clientConfig = {
  entry: ['./client/index.js'],
  output: {
    path: assetsPath,
    filename: '[hash].js',
    publicPath: env.assetsUrl
  },
  plugins : [new AssetsPlugin({prettyPrint: true, path: path.join(__dirname, 'client'), filename:'fileNames.json'})]
};

var devClientConfig = {
  output : {
    filename: 'client.js',
  },
  entry:
    [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?' + env.webpackDevServerUrl,
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}

if(!env.prod){
  defaultConfig = merge(defaultConfig, devConfig);
  clientConfig = merge(clientConfig, devClientConfig);
  serverConfig = merge(serverConfig, devServerConfig);
}

module.exports = {
  server : merge(defaultConfig, serverConfig),
  client : merge(defaultConfig, clientConfig),
  devServer : {
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: buildPath,
    publicPath: 'http://localhost:3001/assets',
    hot: true,
    quiet: false,
    noInfo: true,
    stats: {
        colors: true
    }
  }
};
