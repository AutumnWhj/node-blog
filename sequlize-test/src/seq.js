 const Sequelize = require('sequelize')

 const conf = {
  host: 'localhost',
  dialect: 'mysql'
 }
 
 const seq = new Sequelize('koa2_weibo_db', 'root', 'jin123456', conf)

 module.exports = seq