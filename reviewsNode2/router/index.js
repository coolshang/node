const express = require('express'),
    router = express.Router();
router.get('/',(req,res)=>{
    //引入ejs模块
    let obj = {
        title : 'ejs学习',
        content: 'ejs引入以及模板调用的方法以及变量的使用'
    }
    res.render('index',{data : obj});
});
module.exports = router;