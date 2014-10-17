scrape-indiegogo
================
[ ![Codeship Status for jakeleboeuf/scrape-indiegogo](https://codeship.io/projects/6b1dd260-37e4-0132-e8f4-461894a5379e/status?branch=master)](https://codeship.io/projects/41841)

An API for your indiegogo campaigns.

Just hit `scrape-indiegogo.herokuapp.com/YOUR-PROJECT-SLUG` and you'll get a json representation of your project


#####Example output @ scrape-indiegogo.com/global-learning-xprize

```json

{
  "project": {
    "title": "Global Learning XPRIZE",
    "raised": "$269,563",
    "goal": "$500,000",
    "timeLeft": "21 days left",
    "percentRaised": "54%"
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
    }
  ]
}
```
