1.引入http,url模块并使用
var http = require('http');
var url = require('url');
/**
  *参数1:获取url信息
  *参数2:浏览器返回响应信息
**/
http.createServer(function(require,response){
    // 发送 HTTP 头部
	// HTTP 状态值: 200 : OK
	// 内容类型: text/html
    response.writeHead(200,{'content-Type':'text/html;utf-8'});

    //获得url浏览器的输入的信息
    console.log(require.url);

    //结束响应，告诉客户端所有消息已经发送。当所有要返回的内容发送完毕时，该函数必须被调用一次。
    response.end();
});

安装supervisor修改代码自动重启nodeJS服务器

npm -g install supervisor

运行:
supervisor js文件

nodeJS自定义模块





