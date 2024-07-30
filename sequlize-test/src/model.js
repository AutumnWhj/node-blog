const Sequelize = require('sequelize')
const seq = require('./seq')

// Create User model
const User = seq.define('user', {
  // id will be created automatically
  userName: {
    type: Sequelize.STRING, // varchar(255)
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nickName: {
    type: Sequelize.STRING,
    comment: 'nickname'
  }
})

// Create Blog model
const Blog = seq.define('blog', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

// 创建外键
Blog.belongsTo(User, {
  foreignKey: 'userId'
})
// Blog.belongsTo(User) // 会自动在Blog创建userId，不推荐，因为隐蔽

User.hasMany(Blog, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog
}