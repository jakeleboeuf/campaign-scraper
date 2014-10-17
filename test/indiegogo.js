var expect = require("chai").expect;
var request = require('supertest');
var cheerio = require('cheerio');
var express = require('express');
var projects = require("../routes/api/indiegogo.js");
var app = require("../app");

describe('GET /indiegogo/global-learning-xprize', function(){
    it('should respond with json', function(done){
        request(app)
            .get('/indiegogo/global-learning-xprize')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    })
    it('should have a project object', function(done){
        request(app)
            .get('/indiegogo/global-learning-xprize')
            .set('Accept', 'application/json')
            .end(function (err, res) {
                expect(res.body).to.have.a.property("project")
                done();
            });
    })
    it('should have a perks object', function(done){
        request(app)
            .get('/indiegogo/global-learning-xprize')
            .set('Accept', 'application/json')
            .end(function (err, res) {
                expect(res.body).to.have.a.property("perks")
                done();
            });
    })
})
