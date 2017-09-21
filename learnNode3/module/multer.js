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