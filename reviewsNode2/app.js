const http = require('http'),
    express = require('express'),
    app = express();

app.set('views',__dirname+'/views');
app.set('view engine','ejs');
// app.use(express.static(__dirname+'/public'));
app.use('/abc',express.static(__dirname+'/public'));
app.use('/',require('./router/index'));

http.createServer(app).listen(8000);