var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');
var router = express.Router();

/* GET indiegogo project info. */
router.get('/indiegogo/:projectName', function(req, res) {
  var options = {
    method: "GET",
    uri: "http://indiegogo.com/projects/" + req.params.projectName,
    timeout: 15000
  }

  request(options, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
      if(!$('.i-campaign-page h1').text()) {
        res.status(404);
        res.render('error', {
            message: 'Shoot, that project doesn\'t exist.',
            error: 'Not Found'
        });
        return;
      }

      var json = {
        project: {},
        perks: []
      };

      function trimString (str) {
        return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
      }
      // Get time stuff
      if($('.i-time-left span').last().text() !== '0 time left') {
        var endDate = $('.i-funding-duration').text();
        endDate = endDate.substring(endDate.indexOf('close on') + 1 );
        endDate = moment(endDate).fromNow();
      } else {
        var endDate = 'This project ended';
      }


      // Set up all the project info
      json.project.title = $('.i-campaign-page h1').text();
      json.project.url = options.uri;
      json.project.backers = $('span[data-tab-id="pledges"] .i-count').text();
      json.project.raised = $('.i-project-nutshell .i-balance .currency span').text();
      json.project.goal = $('.i-project-nutshell .i-raised .currency span').text();
      json.project.ends = endDate;
      json.project.percentRaised = Math.ceil(Number(json.project.raised.replace(/[^0-9\.]+/g,"")) / Number(json.project.goal.replace(/[^0-9\.]+/g,"")) * 100) + '%';


      // Loop thru all the perks and poplute the perks object
      $('.i-perks .perk-box-link').each(function( index ) {
        data = $(this);
        var perk = {
          title: trimString(data.find('.i-perk-title').text()),
          amount: data.find('.i-perk-amount .currency span').text(),
          url: 'http://www.indiegogo.com' + $(this).attr('href'),
          description: data.find('.i-perk-description').text(),
          deliveryDate: data.find('.i-delivery-date span').text(),
          claimed: parseInt(data.find('.i-claim-item.claimed span:nth-child(1)').text()),
          available: parseInt(data.find('.i-claim-item.claimed span:nth-child(2)').text()) || 'Unlimited'
        };
        json.perks.push(perk);
      });

      // Send the data
      res.json(json);
    } else {
      if(error.message === 'ETIMEDOUT'){
        // Show the error page
        res.status(408);
        res.json({
          status: 408,
          message: 'Timout Error'
        });
      } else {
        // Show the error page
        res.status(error.status || 404);
        res.render('error', {
            message: error.message,
            error: error
        });
      }
    }
  })
});

module.exports = router;
