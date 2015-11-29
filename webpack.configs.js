var webpack = require('webpack');
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

var serverConfig = {
  module: {
    loaders: [{
          test: /\.json$/, loaders: ['json']
      }]
  },
  entry: ['./server/index'],
  target: 'node',
  output: {
    path: env.buildPath,
    filename: env.serverEntryFile,
  },
  externals: nodeModules,
  node: {
    __dirname: true,
    __filename: true
  },
  plugins: [
    new webpack.IgnorePlugin(/\.(scss)$/),
  ]
}
var devServerConfig = {
  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();',
                             { raw: true, entryOnly: false })
  ]
};

var prodServerConfig = {
};


var clientConfig = {
  entry: ['./client/index.js'],
  output: {
    path: env.assetsPath,
    filename: 'client.js',
    publicPath: env.assetsDir
  },
  plugins : [new AssetsPlugin({prettyPrint: true, path: 'client', filename:'fileNames.json'})]
};

var devClientConfig = {
};

var prodClientConfig = {
  output : {
    filename: '[hash].js',
  }
}

var webpackDevServerClientConfig = {
  output : {
    publicPath: env.webpackDevServerAssetsUrl
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

if(env.prod){
  clientConfig = merge(clientConfig, prodClientConfig);
  serverConfig = merge(serverConfig, prodServerConfig);
}
else{
  clientConfig = merge(clientConfig, devClientConfig);
  serverConfig = merge(serverConfig, devServerConfig);
  defaultConfig = merge(defaultConfig, devConfig);
}
serverConfig = merge(defaultConfig, serverConfig);
clientConfig = merge(defaultConfig, clientConfig);

module.exports = {
  server : serverConfig,
  client : clientConfig,
  webpackDevServerClient : merge(clientConfig, webpackDevServerClientConfig),
  devServer : {
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: env.buildPath,
    publicPath: env.webpackDevServerAssetsUrl,
    hot: true,
    quiet: false,
    noInfo: true,
    stats: {
        colors: true
    }
  }
};
