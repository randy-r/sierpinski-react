const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');
const webpack = require('webpack');


module.exports = merge(baseConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
});
