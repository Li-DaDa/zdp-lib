module.exports = {
  presets: [
    "@babel/preset-env",
    ["@babel/preset-typescript", {
      // 支持所有类型文件
      allExtensions: true
    }]
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-runtime"
  ]
}
