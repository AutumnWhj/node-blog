const handleBlogRouter = (req, res) => {
  const method = req.method
  // Get blog list
  if (method === 'GET' && req.path === '/api/blog/list') {
    return {
      msg: 'This is the blog list'
    }
  }
  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    return {
      msg: 'This is the blog detail'
    }
  }
  // 新建一篇博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    return {
      msg: 'This is the blog new'
    }
  }
  // 更新一篇博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    return {
      msg: 'This is the blog update'
    }
  }
  // 删除一篇博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    return {
      msg: 'This is the blog del'
    }
  }
}
module.exports = handleBlogRouter