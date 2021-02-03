/**  验证方法
* @param {string} str
* @return {Boolean} 
*/
export function validUsername (str) {
  const valid_map= ['admin','editor']
  return valid_map.indexOf(str.trim()) >= 0
}
export function validPassword (str) {
  const reg = /^\d{6,15}$/
  return reg.test(str)
}
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}