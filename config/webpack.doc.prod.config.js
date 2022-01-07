const { merge } = require('webpack-merge')
const CssMiniPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = require('./webpack.doc.base.config')
const { cssRule } = require('./config')

process.env.NODE_ENV = 'production';

module.exports = merge(baseConfig, {
  output: {
    filename: 'scripts/[name].[contenthash:6].js',
    publicPath: './'
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      cssRule(process.env.NODE_ENV)
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 提取公共第三方库为 vendors.js
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      // 提取css为单独文件
      new MiniCssExtractPlugin({
        filename: 'styles/[name].[contenthash:6].css',
      }),
      // 压缩css
      new CssMiniPlugin(),
      // 压缩js
      new TerserPlugin(),
    ],
  },
  plugins: [
  ]
})
