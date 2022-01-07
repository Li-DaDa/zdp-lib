const { merge } = require('webpack-merge')
const CssMiniPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { cssRule } = require('./config')
const baseConfig = require('./webpack.config.base')
const { resolve } = require('./utils')

process.env.NODE_ENV = 'production'

// 是否提取css为单独文件开关
const loadCssFile = false

const plugins = [
  // 压缩css
  new CssMiniPlugin(),
  // 压缩js
  new TerserPlugin(),
]

if(loadCssFile) {
  // 提取css为单独文件
  plugins.push(new MiniCssExtractPlugin({
    filename: 'styles/index.css',
  }))
}

module.exports = merge(baseConfig, {
  entry: './packages/index.ts',
  output: {
    clean: true,
    path: resolve('../lib'),
    // style输出匹配icon需要相对路径
    // publicPath: './',
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'ZdpLib',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  mode: process.env.NODE_ENV,
  externals: {
    vue: 'vue',
  },
  module: {
    rules: [
      // 添加css的loader，打包到lib，不生成单独css
      cssRule(loadCssFile ? 'production' : 'development')
    ]
  },
  optimization: {
    minimizer: plugins,
  },
})
