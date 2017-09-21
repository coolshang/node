const mysql = require('mysql');
//配置数据库信息
let config = mysql.createConnection({
    //数据库的地址
    host: 'localhost',
    //数据库用户信息
    user: 'root',
    password: '',
    //端口号
    port: '3306',
    //数据库名
    database: 'node'
});
//开始连接
config.connect();
//进行数据库操作 1.数据库代码 2.回调
config.query("INSERT INTO `user`(`id`, `username`, `password`) VALUES (4,'user4',1234567)",(err,data)=>{
    console.log(err,data);
});
//结束连接
config.end();