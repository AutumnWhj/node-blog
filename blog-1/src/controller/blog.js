
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

module.exports = {
  getList,
  getDetail,
  newBlog
}