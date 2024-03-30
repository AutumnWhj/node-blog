const mysql = require('mysql');

const { MYSQL_CONF } = require('../conf/db');
// Create connection object
const con = mysql.createConnection(MYSQL_CONF)

// Connect to database
con.connect();

// Execute SQL statement
function exec(sql) {
  // con.query(sql, (err, result) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   console.log(result);
  // })
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      resolve(result);
    })
  })
}

module.exports = {
  exec
}
