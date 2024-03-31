const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel  } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const method = req.method
  const id = req.query.id
  // Get blog list
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author
    const keyword = req.query.keyword
    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData)
    })
  }
  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const result = getDetail(id)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }
  // 新建一篇博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    req.body.author = 'zhangsan' // Fake author
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }
  // 更新一篇博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = updateBlog(id, req.body)
     return result.then(val => {
      return val ? new SuccessModel() : new ErrorModel('Update blog failed')
     })
  }
  // 删除一篇博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    const author = 'zhangsan' // Fake author
    const result = delBlog(id, author)
    return result.then(val => {
      return val ? new SuccessModel() : new ErrorModel('Update blog failed')
     })
  }
}
module.exports = handleBlogRouter

     