var express = require('express');
var router = express.Router();

/* GET home page. */
exports.index = function(req, res) {
  // Lets just send them to github for now
  res.redirect('http://github.com/jakeleboeuf/scrape-indiegogo');
};

/* GET indiegogo example page. */
exports.indiegogo = function(req, res) {
  var url = [
    'indiegogo',
    req.params.projectName,
    req.params.userId
  ].join('/');

  res.render('example', { 
    title: 'Indiegogo',
    url: url,
  });
};

/* GET kickstarter example page. */
exports.kickstarter = function(req, res) {
  var url = [
    'kickstarter',
    req.params.userId,
    req.params.projectName
  ].join('/');

  res.render('example', { 
    title: 'kickstarter',
    url: url,
  });
};
