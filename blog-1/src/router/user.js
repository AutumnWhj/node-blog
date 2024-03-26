const handleUserRouter = (req, res) => {
  const method = req.method
  // Login
  if (method === 'POST' && req.path === '/api/user/login') {
    return {
      msg: 'This is the login interface'
    }
  }
}
module.exports = handleUserRouter
