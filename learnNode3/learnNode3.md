一、数据库的使用

数据类型 int varchar longtext
1.创建表
CREATE TABLE '表名'(
字段1 字段类型 NOT NULL AUTO_INCREMENT(自增长),
字段2  字段类型 NOT NULL,
PRIMARY KEY ('字段名') //重要 :主键
)
ENGINE = InnoDB CHARSET=utf8;

2.增加数据

INSERT INTO '表名' (字段) VALUES (值)

3.删除数据

DELETE FROM '表名' WHERE '字段' = '值'

4.修改数据

update '表名' set '要修改的字段'='修改后的值' where '字段' = '值'

5.查询数据

SELECT * FROM '表名' WHERE '字段'='值'

limit查询几条到几条数据
SELECT * FROM 表名' limit 0,3

order by id desc 根据id从新到久重新排序
SELECT * FROM 表名' order by id desc limit 0,2


二、使用get进行数据交互

1.将mysql.js里的数据库配置以及连接和断开进行公开出去,具体看mysql.js文件

2.在index.js(router/index.js)里的url提价的地址里写上sql语句进行返回数据

3.在html(index.ejs)里使用jq的get提交方式或者使用form表单的get提价方式将要提交的数据发送到要响应的地址里然后返回数据

三、使用post进行数据交互

1.要在package.json引入body-parser模块

2.在app.js里引入

app.use(bodyParser.json()); //用来接收json的数据

//extended:true 可以接受任何数据类型的数据
app.use(bodyParser.urlencoded({extended:true }));

3.使用req.body来接收post传过来的参数

4.req.params 同时接收get,post,其他 提交数据的形式

四、实现注册功能

具体看代码login命名文件

五、实现登录功能

具体看代码reg命名文件


multer模块的使用
在module定义multer.js
里面写上配置信息:

let multer = require("multer"),
    path = require('path');
//上传路径处理 上传之后重命名
let storage = multer.diskStorage({
    //上传文件的路径
    destination: path.join(process.cwd(),'public/img'),
    filename: function (req,file,cb) {
        console.log(file);
        // ['image','jpeg']
        let filename = (file.originalname).split('.');
        cb(null,`${Date.now()}.${filename[filename.length-1]}`);
    }
});
//设置上传文件类型 如果cb(null,true),当第二个参数为true才能允许上传文件
let fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/png'){
        cb(null,true);
    } else{
        cb(null,false);
    }
}
let upload = multer({
    storage:storage,
    fileFilter: fileFilter,
    limits: {
        //限制上传文件大小
    }
});
module.exports = upload;