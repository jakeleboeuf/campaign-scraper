var expect = require("chai").expect;
var request = require('supertest');
var cheerio = require('cheerio');
var express = require('express');
var projects = require("../routes/api/kickstarter.js");
var app = require("../app");

describe('GET /kickstarter/332322466/gram-parsons-cosmic-revival-derry-down', function(){
    it('should respond with json', function(done){
        request(app)
            .get('/kickstarter/332322466/gram-parsons-cosmic-revival-derry-down')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    })
    it('should have a project object', function(done){
        request(app)
            .get('/kickstarter/332322466/gram-parsons-cosmic-revival-derry-down')
            .set('Accept', 'application/json')
            .end(function (err, res) {
                expect(res.body).to.have.a.property("project")
                done();
            });
    })
    it('should have a perks object', function(done){
        request(app)
            .get('/kickstarter/332322466/gram-parsons-cosmic-revival-derry-down')
            .set('Accept', 'application/json')
            .end(function (err, res) {
                expect(res.body).to.have.a.property("perks")
                done();
            });
    })
})
