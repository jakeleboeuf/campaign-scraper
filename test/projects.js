var expect = require("chai").expect;
var projects = require("../routes/projects.js");
var request = require('supertest');
var cheerio = require('cheerio');
var express = require('express');
var app = express();

describe("Projects", function(){
    var url = 'http://scrape-indiegogo.com/project-test';
    it("should send json data", function(){
        var results = projects;
        var json = {
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
                }
            ]
        }

        expect(json).to.have.a.property("project");
        expect(json).to.have.a.property("perks");
    });
});
