// 获取环境变量
const env = process.env.NODE_ENV

// 配置
let MYSQL_CONF
let REDIS_CONF

if(env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'jin123456',
    port: '3306',
    database: 'myblog'
  }

  // redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

if(env === 'production') {
  
}


module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}