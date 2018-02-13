const mysql = require('mysql');
const con = mysql.createConnection({
  multipleStatements: true,
    host: '192.168.64.2',
    user: 'root',
    password: '',
    database: 'dbOrders'
  });

con.connect(function(err) {
if (err) console.log("Cannot connect to db"+err)
else console.log("Connected!");
});

module.exports = con;