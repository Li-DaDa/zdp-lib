const { merge } = require('webpack-merge')
const HtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const EslintPlugin = require('eslint-webpack-plugin');

const baseConfig = require('./webpack.config.base')
const { resolve } = require('./utils')
const packageOptions = require('../package.json');

module.exports = merge(baseConfig, {
  entry: './examples/main.ts',
  output: {
    clean: true,
    path: resolve('../dist')
  },
  resolve: {
    alias: {
      '~': resolve('../examples'),
      'zdp-lib': resolve('../packages')
    }
  },
  plugins: [
    // 注入环境变量
    new webpack.DefinePlugin({
      'process.env': {},
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
    }),
    new HtmlPlugin({
      template: resolve('../public/index.html'),
      inject: 'body',
      title: packageOptions.name,
    }),
    // eslint检测
    new EslintPlugin({
      extensions: ['.vue', 'ts'],
      // warning 不在页面弹窗提示
      emitWarning: false,
      // error 再也没弹窗提示
      emitError: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false,
              },
            },
          },
          {
            loader: resolve('./md-loader/index.js'),
          },
        ],
      }
    ]
  }
})
