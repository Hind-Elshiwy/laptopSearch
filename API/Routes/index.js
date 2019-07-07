var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) =>{
  // res.render('index', { title: 'Express' });
  console.log(req._id);
  res.send("hello world");
});


module.exports = router;
