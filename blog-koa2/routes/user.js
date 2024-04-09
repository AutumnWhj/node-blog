const router = require('koa-router')()

const { login } = require('../controller/user')
const { SuccessModel, ErrorModel  } = require('../model/resModel')

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body
  const data = await login(username, password)
  console.log('data: ', data);
  if(data.username) {
    ctx.session.username = data.username
    ctx.session.realname = data.realname
    ctx.body = new SuccessModel('Login successful')
    return
  }
  ctx.body = new ErrorModel('Login failed')
})

router.get('/session-test', async function (ctx, next) {
  ctx.session.viewCount = (ctx.session.viewCount || 0) + 1
  ctx.body = {
    errno: 0,
    viewCount: ctx.session.viewCount
  }
})

module.exports = router
