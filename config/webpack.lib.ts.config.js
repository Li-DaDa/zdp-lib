/**
 * @description 打包ts类型文件
 * @author LiJun
*/

const { VueLoaderPlugin } = require('vue-loader');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const path = require('path');
const { cssRule } = require('./config')

// const resolve = (src) => path.resolve(__dirname, src);

module.exports = {
  entry: './packages/index.ts',
  mode: 'production',
  output: {
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.vue', '.js'],
  },
  performance: {
    hints: false,
  },
  externals: {
    vue: 'vue',
  },
  module: {
    rules: [
      cssRule('development'),
      {
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
        test: /\.(svg|otf|ttf|woff2?|eot)(\?\S*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name][ext]',
        },
        exclude: /node_modules/,
      }, {
        test: /\.vue$/,
        use: ['vue-loader'],
      }, {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }, {
          loader: 'ts-loader',
          options: {
            compilerOptions: {
            },
            configFile: 'tsconfig.ts.json',
            appendTsSuffixTo: [/\.vue$/],
          },
        }],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    // 打包进度
    new ProgressBarPlugin(),
  ],
};
