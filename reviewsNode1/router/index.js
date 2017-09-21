const express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {
    // res.send('index');
    res.sendFile(process.cwd()+'/module/index.html');
});
router.get('/get',(req, res) => {
   res.send('get');
});
router.get('/[0-9]{1,5}/',(req,res)=>{
    res.send('正则');
})

module.exports = router;