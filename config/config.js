const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// css加载规则配置，resolve-url-loader 用于解析css中 url 引入的资源，包括图片、iconfont等，需要配合 sass-loader 配置 sourceMap
exports.cssRule = function(mode) {
  return {
    test: /\.(css|sass|scss)$/,
    use: [mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', {
      loader: require.resolve('resolve-url-loader')
    }, {
      loader: 'sass-loader',
      options: {
        sourceMap: true
      }
    }]
  }
}
