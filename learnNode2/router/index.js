const express = require('express'),
    router = express.Router();

router.get('/',(req,res)=>{
   //res.render 用来响应模板引擎文件的
    // 'index' 是代表响应的是 index.ejs模板引擎
    let obj = {
       name :'learnNode2',
        kecheng:'node',
        yuefen : '9月'
    };
   res.render('index.ejs',{data: obj});
});
module.exports =router;