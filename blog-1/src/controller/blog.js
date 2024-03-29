
const getList = (author, keyword) => {
  // 先返回假数据（格式是正确的）
  return [{
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: new Date().getTime(),
    author: '张三'
  }]
}

const getDetail = (id) => {
  // 先返回假数据
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: 1546610491112,
  }
}

const newBlog = (blogData = {}) => {
  return {
    id: 3,
  }
}

const updateBlog = (id, blogData = {}) => {
  // id 就是要更新博客的 id
  // blogData 是一个博客对象，包含 title content 属性
  console.log('update blog', id, blogData)
  return true
}

const delBlog = (id) => {
  // id 就是要删除博客的 id
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}