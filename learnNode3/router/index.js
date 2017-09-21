const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql');

router.get('/',(req,res)=>{
    if(typeof  req.session.admin) {
        res.locals.admin = req.session.admin;
    }
    //LIMIT 查询几条到几条数据
    //order by desc 根据id从 新 => 旧进行排序
    sql('SELECT * FROM `user` order by id desc limit 0,2',(err,data)=>{
        res.locals.data = data;
        sql('SELECT * FROM article order by id desc limit 0,10',(err,data)=>{
            res.locals.act = data;
            res.render('index',{data: res.locals.data,act:res.locals.act});
        });
   });

});

router.get('/article/list-:page.html',(req,res)=>{
    // console.log(req.params);
    sql('select * from article order by id desc limit ?,2',[(req.params.page-1 )*2],(err,data1)=>{
        sql('select * from article ',(err,data)=>{
            let all = Math.ceil((data.length)/2);
            console.log(all);
            res.render('article/article_list',{data: data1, all: all})
        });
        // res.send(data);
    })
});
router.get('/article/:id.html',(req,res)=>{
    //req.params 同时接收get,post,其他 提交数据的形式
    let id = req.params.id;
    sql('SELECT * FROM article where id=?',[id],(err,data)=>{
        sql('SELECT * FROM articlepinglun where pid=?',[id],(err,data1)=> {
            console.log('readId='+req.cookies.readId);
            if(!req.cookies.count || req.cookies.count.readId != id) {
                res.cookie('count',{ip:req.ip,readId: id},{maxAge:60*60*24});
                let read = Number(data[0].readnum) + 1;
                sql("update article set readnum=? where id=?",[read,id],(err,data)=>{
                    console.log(err,data);
                })
            }
            if(data.length == 0){
                res.status(404).render('404');
            }else {
                res.render('article', {data: data, pinglun: data1});
            }
        });
    });
});
router.post('/article/:id.html',(req,res)=>{
    let time = new Date().toLocaleString().substring(0,15);
    sql('INSERT INTO articlepinglun (id,uid,pid,content,time) VALUES (1,0,?,?,?)',[req.params.id,req.body.content,time],(err,data)=>{
        if(!data){
            res.status(404).render('404');
        }else {
           res.send('成功');
        }
    });
});
router.get('/post',(req,res)=>{

    res.render('post');
});
/*router.get('/reg',(req,res)=>{
    console.log(req.query.name);
    //? 动态数据  1.数据库代码 2.数据库的值[ ]
    sql("INSERT INTO `user` (`id`,`username`,`password`) VALUES (0,?,?)",[req.query.name,req.query.pass],(err,data)=>{
         res.json({
             msg: '增加成功!'
         })
    });

});
router.post('/reg',(req,res)=>{
    //req.body用来接收post方式提交的数据
    console.log(req.body);
    sql("INSERT INTO `user` (`id`,`username`,`password`) VALUES (0,?,?)",[req.body.name,req.body.pass],(err,data)=>{
        console.log(err,data);
        res.json({
            msg: '增加成功!'
        })
    });

});*/
//退出
router.use('/logout',(req,res)=>{
    //清除cookie
    res.clearCookie('login');
    //网址重定向
    res.redirect('/');
});
router.use('/login',require('./login'));
router.use('/reg',require('./reg'));

module.exports = router;