const seq = require('./seq')

require('./model')

//连接数据库
seq.authenticate().then(() => {
  console.log('auth ok');
}).catch(() => {
  console.log(' auth err');
})

// 执行同步
seq.sync({ force : true }).then(() => {
  console.log('sync ok');
  process.exit()
})