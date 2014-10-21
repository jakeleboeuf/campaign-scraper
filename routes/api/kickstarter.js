var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');
var router = express.Router();

/* GET kickstarter project info. */
router.get('/kickstarter/:userId/:projectName', function(req, res) {
  var url = [
    'http://kickstarter.com/projects',
    req.params.userId,
    req.params.projectName
  ].join('/');

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
      var projectTitle = $('#project-header .title h2').text();
      if(!projectTitle) {
        res.status(404);
        res.render('error', {
            message: 'Shoot, we can\'t find a project called ' + req.params.projectName,
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
      // Set up all the project info
      json.project.title = trimString(projectTitle);
      json.project.url = url;
      json.project.video = [
        url,
        'widget/video.html'
      ].join('/');
      json.project.videoEmbed = [
        '&lt;iframe frameborder="0" height="360" scrolling="no" src="',
        url,
        '/widget/video.html" width="480"&gt;&lt;/iframe&gt;'
      ].join('');
      json.project.backers = $('*[data-backers-count]').data('backers-count');
      json.project.raised = '$' + Math.ceil($('.NS_projects__ecom #pledged').data('pledged'));
      json.project.goal = '$' + Math.ceil($('.NS_projects__ecom #pledged').data('goal'));
      json.project.percentRaised = parseInt($('.NS_projects__ecom #pledged').data('percent-raised') * 100) + '%';
      json.project.ends = moment(trimString($('.NS_projects__ecom #stats div h5').data('end_time'))).fromNow();


      // Loop thru all the perks and poplute the perks object
      $('.NS-projects-rightcol-rewards .NS-projects-reward').each(function( index ) {
        data = $(this);

        // If the campaign is still active, set the pledge url
        // Otherwise, just link to the project
        if (data.find('.pledge').attr('href')) {
          var pledgeUrl = 'http://www.kickstarter.com' + data.find('.pledge').attr('href');
        } else {
          var pledgeUrl = url;
        }

        // Check if is is a limited perk
        var amountAvailable = data.find('.limited-number').text().replace(/[^\w\s]/gi, '');
        var re = /(.*\ \s+)(.*)(\s+i\).*)/;
        var newtext = amountAvailable.replace(re, "$2");

        // Set up the perks objects
        var perk = {
          title: trimString(data.find('.mb1').text()),
          amount: '$' + trimString(data.find('.mb1').text()).replace(/\D/g,''),
          url: pledgeUrl,
          description: data.find('.desc p').text(),
          deliveryDate: data.find('.delivery-date time').text(),
          claimed: parseInt(data.find('.num-backers').text()),
          available: parseInt(amountAvailable.substring(amountAvailable.lastIndexOf(" ")+1)) || 'Unlimited'
        };
        json.perks.push(perk);
      });

      // Send the data
      res.json(json);
    } else {
      // Show the error page
      res.status(err.status || 404);
      res.render('error', {
          message: err.message,
          error: err
      });
    }
  })
});

module.exports = router;
