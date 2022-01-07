const path = require('path')

exports.resolve = (src) => {
  return path.resolve(__dirname, src)
}
