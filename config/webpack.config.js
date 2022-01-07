const { resolve } = require('./utils')



module.exports = {
  entry: './packages/index.ts',
  output: {
    path: resolve('../lib'),
    publicPath: '/',
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'ZdpLib',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  mode: "development",
  resolve: {
    extensions: ['.ts', '.vue', '.mjs', '.js']
  },
  externals: {
    vue: 'vue',
  },
  module: {
    rules: [
      
    ]
  }
}