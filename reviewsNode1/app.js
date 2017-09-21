const http = require('http'),
     express = require('express'),
    //初始化
    app = express();

app.use('/',require('./router/index'));
app.use('/admin',require('./router/admin'));
// app.get('/',(req,res) => {
//     res.send('send');
// });
http.createServer(app).listen(4000);