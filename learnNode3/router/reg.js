
const express = require("express"),
    router =express.Router(),
    sql = require('../module/mysql'),
    crypto = require('crypto');

router.get('/',(req,res)=>{
    res.render('reg');
});
router.post('/',(req,res)=>{
    const  name = req.body.name,
        pass = req.body.pass,
        md5 = crypto.createHash('md5');
    sql('select * from user where username=?',[name],(err,data)=>{
        console.log(data);
        if(data){
            res.cookie('login',{name: name},{maxAge:1000*60});
            //console.log('可以注册');
            //              加密 密码       编码格式hex
            let newpass = md5.update(pass).digest('hex');
            console.log(newpass);
            sql("INSERT INTO `user` (`id`,`username`,`password`,`admin`) VALUES (0,?,?,0)",[name,newpass],(err,data)=>{
                if(err){
                    res.render('err.ejs');
                    return;
                }
                res.locals.result = '<h1>成功</h1>';
                res.render('reg',{result:'成功'})
            })
        }else {
            //console.log('不可以注册');
            res.render('err.ejs');
        }
    });
})
module.exports =router;