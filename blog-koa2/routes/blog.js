const router = require('koa-router')()

const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel  } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
  let author = ctx.query.author || ''
  const keyword = ctx.query.keyword || ''

  if(ctx.query.isadmin) {
    if (!ctx.session.username) {
      ctx.body = new ErrorModel('Not logged in')
      return 
    }
    author = ctx.session.username
  }
  const listData = await getList(author, keyword)
  ctx.body = new SuccessModel(listData)
})

router.get('/detail', async function (ctx, next) {
  const data = await getDetail(ctx.query.id)
  ctx.body = new SuccessModel(data)
})

router.post('/new', loginCheck, async function (ctx, next) {
  ctx.request.body.author = ctx.session.username
  const data = await newBlog(ctx.request.body)
  ctx.body = new SuccessModel(data)
})

router.post('/update', loginCheck, async function (ctx, next) {
  const val = await updateBlog(ctx.query.id, ctx.request.body)
  if(val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('Update blog failed')
  }
})

router.post('/del', loginCheck, async function (ctx, next) {
  const author = ctx.session.username
  const val = await delBlog(ctx.query.id, author)
  if(val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('Delete blog failed')
  }
})

module.exports = router
