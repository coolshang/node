const  http = require('http'),
        express = require('express'),
    //初始化
        app = express();

//响应浏览器的方法
//第一个参数响应的路径, 第二个参数回调
// app.get('/',(req,res) => {
//     //响应数据的方法之一
//     res.send('Hello Word!!!');
// });
//访问当前路径的时候  使用index文件里的路由方法
//访问当前路径的时候  交给index处理
app.use('/',require('./router/index'));
//app.post();

http.createServer(app).listen(233);