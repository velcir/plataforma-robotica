const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const exclude = /node_modules/;

module.exports = {
  context: __dirname + '/src',
  entry: './index.ts',
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  output: {
    path: __dirname + '/dist',
    filename: 'index.js'
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts!tslint', exclude: exclude },
      { test: /\.json$/, loader: 'json', exclude: exclude }
    ]
  },
  target: 'node',
  externals: [nodeExternals()]
};
