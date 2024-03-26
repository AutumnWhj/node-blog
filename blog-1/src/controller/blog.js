
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

module.exports = {
  getList
}