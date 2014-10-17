var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  // Lets just send them to github for now
  // res.render('index', { title: 'Scrape Indiegogo' });
  res.redirect('http://github.com/jakeleboeuf/scrape-indiegogo');
});

module.exports = router;
