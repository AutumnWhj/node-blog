const mysql = require('mysql');

// Create connection object
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jin123456',
  port: '3306',
  database: 'myblog'
})

// Connect to database
con.connect();

// Execute SQL statement
// select * from users;
// select id, username from users;
// update users set realname='李四' where username='lisi';
const sql = `update users set realname='李四2' where username='lisi';`
con.query(sql, (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(result);
})

// Close connection
con.end();