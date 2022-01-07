/**
 * @description 字符串操作方法
*/

/**
 * @description 首字母大写
 * @param {string} str
*/
export const toCalmel = (str: string) => {
  return str.replace(/\b(\w)/, (v) => {
    return v.toUpperCase()
  })
}
