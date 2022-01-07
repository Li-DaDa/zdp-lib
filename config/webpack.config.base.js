const { VueLoaderPlugin } = require('vue-loader');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const { resolve } = require('./utils')

module.exports = {
  resolve: {
    // .mjs 是支持现在新版本外部库导出的原生 esmodule
    extensions: ['.ts', '.vue', '.mjs', '.js'],
    alias: {
      '@': resolve('../packages')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: ['vue-loader']
      }, {
        test: /\.(svg|otf|ttf|woff2?|eot)(\?\S*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name][ext]',
        },
        exclude: /node_modules/,
      }, {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset',
        generator: {
          filename: 'images/[name].[contenthash:6][ext]',
        },
        parser: {
          dataUrlCondition: {
            // 当图片资源小于该值，会打包成base64，大于该值打包出资源链接
            maxSize: 10 * 1024,
          },
        },
        exclude: /node_modules/,
      }, {
        test: /\.(ts|js)x?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },{
        test: /\.mjs$/i,
        resolve: { byDependency: { esm: { fullySpecified: false } } }
      }
    ]
  },
  plugins: [
    // vue loader插件
    new VueLoaderPlugin(),
    // element-plus 按需加载
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // 打包进度
    new ProgressBarPlugin()
  ]
}
