const mysql = require('mysql');

let config = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'',
    port: '3306',
    database:'node'
})
config.connect();

config.query('SELECT * FROM user',(err,data)=>{
   console.log(err,data);
});
config.end();