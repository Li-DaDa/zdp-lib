const { merge } = require('webpack-merge')

const { resolve } = require('./utils')
const baseConfig = require('./webpack.doc.base.config')
const { cssRule } = require('./config')

process.env.NODE_ENV = 'development';

module.exports = merge(baseConfig, {
  output: {
    filename: 'scripts/[name].js',
    publicPath: '/'
  },
  mode: process.env.NODE_ENV,
  devtool: 'inline-source-map',
  devServer: {
    port: '3000',
    hot: true,
    static: resolve('../dist')
  },
  module: {
    rules: [
      cssRule(process.env.NODE_ENV)
    ]
  }
})
