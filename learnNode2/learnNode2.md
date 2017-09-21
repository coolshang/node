ejs 用来配置模板引擎
res.render 响应模板引擎文件


1.在 package.json添加依赖项
"ejs": "latest"

2. 在app.js添加

//设置模板引擎的目录
app.set('views',__dirname+'/views');
//设置使用的模板引擎是什么
app.set('view engine','ejs');

3.在router/index.js里响应写入
res.render('index');  //index就是模板引擎index.ejs

(1)如何在ejs里引入数据
let obj = {
    title: 1,
    content: '数据'
}
res.render('index.ejs',{data: obj});
(2)在index.ejs里使用: 注只能用res才能传变量在模板里.
<%for(var i in data) {%>
    <%- data[i]%>
<%}%>
变量的使用有二种方法
<%= name%>

-将字符串转换成html代码
<%- name%>

4.如何引入静态资源(js img css),在app.js里输入
app.use(express.static(__dirname+'/public'));

也可以在这样
app.use('/abc',express.static(__dirname+'/public'));
但是在ejs里的路径要
例如:加上abc/img/.png

5.如何连接数据库

const mysql = require('mysql');
//配置数据库信息
let config = mysql.createConnection({
    //数据库的地址
    host: '',
    //数据库用户信息
    user: '',
    password: '',
    //端口号
    port: '',
    //数据库名
    database: ''
});
//开始连接
config.connect();
//进行数据库操作 1.数据库代码 2.回调
config.query("",(err,data)=>{
    console.log(err,data);
});
//结束连接
config.end();