
const { User, Blog } = require('./model')

!(async function () {
  // Create User
  const zhangsan = await User.create({
    userName: 'zhangsan',
    password: '123',
    nickName: '张三'
  })
  const zhangsanId = zhangsan.dataValues.id

  const lisi = await User.create({
    userName: 'lisi',
    password: '123',
    nickName: '李四'
  })
  const lisiId = lisi.dataValues.id

  // Create Blog
  const blog1 = await Blog.create({
    title: 'Title1',
    content: 'Content1',
    userId: zhangsanId
  })
  const blog2 = await Blog.create({
    title: 'Title2',
    content: 'Content2',
    userId: zhangsanId
  })
  const blog3 = await Blog.create({
    title: 'Title3',
    content: 'Content3',
    userId: lisiId
  })
  const blog4 = await Blog.create({
    title: 'Title4',
    content: 'Content4',
    userId: lisiId
  })
})()