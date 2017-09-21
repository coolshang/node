const express = require('express'),
    router = express.Router();


router.get('/',(req,res) =>{
    //res.send()       响应数据的方法之一
    // res.sendFile()  绝对路径响应一个文件的方法
    //res.json()       响应json数据

    res.sendFile(process.cwd()+'/views/index.html');
});
router.get('/123',(req,res) =>{

    res.send('Hello 123');
});
//暴露出去
module.exports = router;