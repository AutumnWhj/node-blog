
const loginCheck = (username, password) => {
  // Mock loginCheck
  if (username === 'zhangsan' && password === '123') {
    return true
  }
  return false
}
module.exports = {
  loginCheck
}