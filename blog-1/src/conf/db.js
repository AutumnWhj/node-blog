// 获取环境变量
const env = process.env.NODE_ENV

// 配置
let MYSQL_CONF

if(env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'jin123456',
    port: '3306',
    database: 'myblog'
  }
}

if(env === 'production') {
  
}


module.exports = {
  MYSQL_CONF
}