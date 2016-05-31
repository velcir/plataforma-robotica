var webpack = require('webpack');
var exclude = /node_modules/;

var defineObj = {
  ON_TEST: process.env.NODE_ENV === 'test',
  ON_DEVELOPMENT: process.env.NODE_ENV === 'development',
  ON_PRODUCTION: process.env.NODE_ENV === 'production'
};

var plugins = [
  new webpack.DefinePlugin(defineObj),
  new webpack.NoErrorsPlugin()
];

if (defineObj.ON_PRODUCTION) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress: {warnings: false},
    output: {comments: false}
  }));
}

module.exports = {
  context: __dirname + '/src',
  entry: './index.ts',
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  output: {
    path: __dirname + (defineObj.ON_TEST ? '/test' : '/www'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.ts$/, loader: 'ng-annotate!ts!tslint', exclude: exclude},
      {test: /\.css/, loader: defineObj.ON_PRODUCTION ? 'style!css?minimize' : 'style!css'},
      {test: /\.html/, loader: 'html'},
      {test: /\.png/, loader: 'file?name=img/[name].[ext]'},
      {test: /\.(ttf|eot|svg|woff)/, loader: 'file?name=fonts/[name].[ext]'}
    ]
  },
  debug: !defineObj.ON_PRODUCTION,
  devtool: '#source-maps',
  watchOptions: {
    aggregateTimeout: 200
  },
  plugins: plugins
};
