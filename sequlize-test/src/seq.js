 const Sequelize = require('sequelize')

 const conf = {
  host: 'localhost',
  dialect: 'mysql'
 }
 
 // 连接池 一般用在显示，线下的话不用——便于调试
 conf.pool = {
  max: 5, // 连接池中最大的连接数量
  min: 0, // 最小
  idle: 10000 // 如果一个连接池10s之内没有被使用，则释放
 }

 const seq = new Sequelize('koa2_weibo_db', 'root', 'jin123456', conf)

 module.exports = seq