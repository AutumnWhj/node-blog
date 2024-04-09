const router = require('koa-router')()

router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
  ctx.body = {
    errno: 0,
    data: [1, 2, 3]
  }
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
