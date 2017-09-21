const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql'),
    crypto= require('crypto');

router.get('/',(req,res)=>{
    res.locals.admin = req.session.admin;
    // console.log(res.locals.admin);
    if(req.cookies['login']) {
        res.locals.login =req.cookies.login.name;
    }
    res.render('login');
});
router.post('/',(req,res)=>{
    const name = req.body.name,
        pass = req.body.pass,
        md5 = crypto.createHash('md5');
    let newpass = md5.update(pass).digest('hex');
    sql("select * from user where username=? and password=?",[name,newpass],(err,data)=>{
        if(data.length == 0){
            res.json({
                msg:'用户名或密码错误'
            });
            return;
        }
        if(data[0].password == newpass){
            //1.cookie的名称 2.数据 3.过期时间
            res.cookie('login',{name:name},{maxAge: 1000*60*60*24});

            //session 所有后台页面都是可以访问到的
            //保存到服务器上的
            //session在关闭页面的时候 session下面保存的数据 被清空
            req.session.admin =  data[0].admin;
            console.log(req.session.admin);
            res.json({
                msg :'成功'
            });
        }else{
            res.render('err');
            return;
        }

    });
});

module.exports = router;