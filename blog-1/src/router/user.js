const { login } = require('../controller/user')
const { SuccessModel, ErrorModel  } = require('../model/resModel')



const handleUserRouter = (req, res) => {
  const method = req.method
  // Login
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body
    const result = login(username, password)
    return result.then(data => {
      if(data.username) {
        req.session.username = data.username
        req.session.realname = data.realname

        return new SuccessModel('Login successful')
      }
      return new ErrorModel('Login failed')
    })
  }
  // 登录验证的测试
  if (method === 'GET' && req.path === '/api/user/login-test') {
    if(req.session.username) {
      return Promise.resolve(new SuccessModel({
        username: req.session
      }))
    }
    return Promise.resolve(new ErrorModel('Login failed'))
  }
}

module.exports = handleUserRouter
