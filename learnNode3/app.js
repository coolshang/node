const http = require('http'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    sql = require('./module/mysql.js');

app.set('views',__dirname+'/views');
app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));

app.use(bodyParser.json()); //用来接收json的数据

//extended:true 可以接受任何数据类型的数据
app.use(bodyParser.urlencoded({extended:true }));

app.use(cookieParser('123213')); //密钥

app.use(session({ secret : 'node' }));

//use get post 进入函数后就出不去了
app.use((req,res,next)=>{
    console.log(req.ip);
    if(req.cookies.login){
        console.log(req.session.admin);
        res.locals.login = req.cookies.login.name;
        if(typeof req.session.admin && req.session.admin != undefined){
            sql("select * from user where username=?",[res.locals.login],(err,data)=>{
                req.session.admin = Number(data[0].admin);
            });
        };
        //继续往下执行
        next();
    }else{
        console.log(2);
        //继续往下执行
        next();
    }
});

app.use('/',require('./router/index'));

app.use('/admin',require('./router/admin'));

http.createServer(app).listen(520);