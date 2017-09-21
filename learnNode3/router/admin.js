const express = require("express"),
        router = express.Router(),
        sql = require("../module/mysql"),
        upload = require("../module/multer");


//get post 任何形式的访问都会走这一条路由
router.use((req,res,next)=>{
    if(req.session.admin == 1) {
        next();
    }else{
        res.send('请使用管理员账号登录');
    }
})
router.get('/',(req,res)=>{
    if(req.session.admin == 1) {
        res.render('admin/admin');
    }
});
router.get('/user',(req,res)=>{
    sql('select * from user', (err, data) => {
        let users = data;
        res.render('admin/user', {data: users});
    });
});
router.post('/user',(req,res)=>{
    // res.render('admin/user');
    let id = req.body.id;
    sql('DELETE FROM user WHERE id = ?',[id],(err,data)=>{
        if(data){
            res.json({
                code: 200,
                msg: '删除成功!'
            });
        }else {
            res.json({
                code: 201,
                msg: '删除失败!'
            })
        }
    })
});
router.get('/user/updateuser',(req,res)   =>{
    let id =  req.query.id;
    sql('select * from user where id=?',[id],(err,data)=>{
        if(data.admin == 1){
            data.admin = '是';
        }else{
            data.admin = '否';
        }
        let users = data;
        res.render('admin/updateuser',{data: users,admin: data.admin});
    });
});
router.post('/user/updateuser',(req,res)=>{
    let id =  req.body.id,
    name = req.body.name,
    admin = req.body.admin;
    sql('update user set username=?,admin=? where id=?',[name,admin,id],(err,data)=>{
        if(err){
            res.send('更新失败');
            return;
        };
        if(data){
            res.json({
                msg: '修改成功!',
                code : 200
            });
        }else{
            res.json({
                msg: '修改失败!'
            });
        };
    });
});
router.get('/article',(req,res)=>{
   res.render('admin/article');
});

//                      upload.single 用来接收一个文件
router.post('/article',upload.array('art'),(req,res)=>{
    if(!req.files){

    }
    /*let title = req.body.title,
        author = req.body.author,
        tag = req.body.tag,
        content = req.body.content,
        img = '/img/'+req.file.filename;
        time    = new Date().toLocaleString().substring(0,15);
    // console.log(req.file);
    // res.send(req.file.filename);
    sql("INSERT INTO article (id,title,author,tag,content,time,img) VALUES (0,?,?,?,?,?,?)",[title,author,tag,content,time,img],(err,data)=>{
        if(err){
            res.send('添加文章失败');
            code : 404
            return;
        }
        if(data){
            res.json({
                msg: '添加文章成功',
                code: 200
            });
        }else {
            res.json({
                msg: '添加文章失败',
                code : 201
            })
        }
    });*/

});

module.exports = router;