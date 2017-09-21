const express = require('express'),
    router = express.Router();

router.get('/',(req,res)=>{
    res.send('admin');
});

router.get('/index',(req,res)=>{
    res.send('admin/index');
})

module.exports = router;