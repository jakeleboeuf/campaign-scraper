scrape-indiegogo
================
[ ![Codeship Status for jakeleboeuf/scrape-indiegogo](https://codeship.io/projects/6b1dd260-37e4-0132-e8f4-461894a5379e/status?branch=master)](https://codeship.io/projects/41841)

An API for your indiegogo and kickstarter campaigns.


### [Example](https://github.com/jakeleboeuf/scrape-indiegogo/blob/master/example/index.html)
Make requests to the scraper just like you would expect. Something like this little jQuery example should get you headed in the right direction:

```html
<!DOCTYPE html>
<html>
<head>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script>
  $(document).ready(function(){
    $.getJSON( "http://scrape.jklb.co/indiegogo/global-learning-xprize", function( data ) {
      var items = [];
      var projectContainer = $("#project");
      var perksContainer = $("#perks");
      $.each( data, function( key, value ) {
        if(key === 'project'){
          $("#project").append('<ul></ul>').find('ul');
          $.each( value, function( key, val ) {
            projectContainer.append( "<li id='" + key + "'>"+ key + ': ' + val + "</li>" );
          });
        };
        if(key === 'perks'){
          $.each( value, function( key, val ) {
            $('#perks').append('<ul></ul>').find('ul')
            $.each( val, function( key, perk ) {
              perksContainer.append( "<li id='" + key + "'>"+ key + ': ' + perk + "</li>" );
            });
          });
        };
      });
      $( "<ul/>", {
        "class": "my-new-list",
        html: items.join( "" )
      }).appendTo( "body" );
      $('#project h3').html('Project Details');
      $('#perks h3').html('Perks');
    });
  });
</script>
</head>
<body>
  <div id="main">
    <h2>Get the results please</h2>
  </div>
  <div id="project">
    <h3>Loading Project Details...</h3>
  </div>
  <div id="perks">
    <h3>Loading Perks...</h3>
  </div>
</body>
</html>

```


###Usage
Nothing fancy here. Just a nice JSON representation of your fundraising campaign.
######Indiegogo Projects:

[scrape.jklb.co/indiegogo/YOUR-PROJECT-SLUG](http://scrape.jklb.co/indiegogo/global-learning-xprize) will give you a great JSON representation of your campaign.


#####Example output @ [scrape.jklb.co/indiegogo/global-learning-xprize](http://scrape.jklb.co/indiegogo/global-learning-xprize)

```json
"project": {
  "title": "Global Learning XPRIZE",
  "url": "http://indiegogo.com/projects/global-learning-xprize",
  "backers": "1,341",
  "raised": "$269,563",
  "goal": "$500,000",
  "percentRaised": "54%",
  "ends": "in 20 days"
},
"perks": [
  {
    "title": "EARLY ACCESS package",
    "amount": "$25",
    "url": "http://www.indiegogo.com/projects/global-learning-xprize/contributions/new?perk_amt=25&perk_id=2314758",
    "description": "With this perk get early access to this revolutionary software, 18 months\nbefore anyone else, to test with kids near you.\n\nIn addition to the previous perks, you also get:\n\n · A Vote: As a Digital Visioneer you will get a vote where the XPRIZE\nFoundation should launch its next major competition.\n · Credit: Get your name credited in the winning software that is used by\nhundreds of millions of kids.\n · Digital Content: Exclusive extended digital content (interviews,\nvideos, images, and more!)",
    "deliveryDate": "",
    "claimed": 186,
    "available": "Unlimited"
  },
  {
    "title": "SUPPORTER package",
    "amount": "$10",
    "url": "http://www.indiegogo.com/projects/global-learning-xprize/contributions/new?perk_amt=10&perk_id=2314753",
    "description": "Help bring literacy to hundreds of millions of children around the world by showing your support for the campaign!\n\nIncludes:\n• Website Credit: Get your name listed as a supporter on the Global Learning XPRIZE website!\n• Digital Certificate: Receive a digital donation certificate that you can use to show your support!",
    "deliveryDate": "",
    "claimed": 74,
    "available": "Unlimited"
  },
  {
    "title": "ADVOCATE VISIONEER package",
    "amount": "$50",
    "url": "http://www.indiegogo.com/projects/global-learning-xprize/contributions/new?perk_amt=50&perk_id=2314760",
    "description": "Grab this perk and get an awesome swag bag as well as live video access to\nour Visioneering event, where you can watch and vote on how future XPRIZE\nare created.\n\nGet all the previous perks as well as:\n\n · Watch: Live web video access to our exclusive Visioneering event.\n · Wear: An exclusive, limited edition, Global Learning XPRIZE T-shirt.\n · Represent: Three awesome Global Learning XPRIZE stickers.\n · Show: A neat Global Learning Wristband to show your support!",
    "deliveryDate": "",
    "claimed": 165,
    "available": "Unlimited"
  },
  {...}
]
```

######Kickstarter Projects:
[scrape.jklb.co/YOUR-USER-ID/YOUR-PROJECT-SLUG](http://scrape.jklb.co/kickstarter/332322466/gram-parsons-cosmic-revival-derry-down) will give you a great JSON representation of your campaign.

#####Example output @ [http://scrape.jklb.co/kickstarter/332322466/gram-parsons-cosmic-revival-derry-down](http://scrape.jklb.co/kickstarter/332322466/gram-parsons-cosmic-revival-derry-down)

```json
"project": {
  "title": "A N O M A L Y",
  "url": "http://kickstarter.com/projects/639662626/a-n-o-m-a-l-y",
  "backers": 654,
  "raised": "$67302",
  "goal": "$60000",
  "percentRaised": "112%",
  "ends": "a year ago"
},
"perks": [
  {
    "title": "Pledge $5 or more",
    "amount": "$5",
    "url": "http://kickstarter.com/projects/639662626/a-n-o-m-a-l-y",
    "description": "Personal shout out on social media.",
    "deliveryDate": "Aug 2013",
    "claimed": 21,
    "available": "Unlimited"
  },
  {
    "title": "Pledge $10 or more",
    "amount": "$10",
    "url": "http://kickstarter.com/projects/639662626/a-n-o-m-a-l-y",
    "description": "Downloadable link to original soundtrack. (private use only)",
    "deliveryDate": "Dec 2013",
    "claimed": 22,
    "available": "Unlimited"
  },
  {...}
]
```
