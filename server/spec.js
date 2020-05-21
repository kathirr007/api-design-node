var app = require('./server');
var request = require('supertest');
var expect = require('chai').expect;

var colors = require('colors')

// TODO: make tests for the other CRUD routes
// DELETE, UPDATE, PUT, GET ONE
// to run the test type mocha server/specs.js

describe(colors.brightMagenta.bold('[LIONS]--->'), function(){

  it('should get all lions', function(done) {
    request(app)
      .get('/lions')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array');
        done();
      })
  });

  it('should get specific lion', function(done) {
    var lion = {
      name: 'Kathirr007',
      age: 34,
      pride: 'The lion king',
      gender: 'male'
    }
    request(app)
      .post('/lions')
      .send(lion)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        var lion = resp.body
        request(app)
          .get('/lions/' + lion.id)
          .end(function(err, resp) {
            expect(resp.body).to.be.an('object');
            done();
          })
      })
  });
  
  it('should create a lion', function(done) {
    var lion = {
      name: 'Kathirr007',
      age: 34,
      pride: 'The lion king',
      gender: 'male'
    }
    request(app)
      .post('/lions')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201) 
      .end(function(err, resp) {
        expect(resp.body).to.be.an('object');
        done();
      })
  });

  it('should delete a lion', function(done) {
    var lion = {
      name: 'Kathirr007',
      age: 34,
      pride: 'The lion king',
      gender: 'male'
    }
    request(app)
      .post('/lions')
      .send(lion)
      .set('Accept', 'application/json')
      // .expect('Content-Type', /json/)
      // .expect(201)
      .end(function(err, resp) {
        var lion = resp.body
        request(app)
          .delete('/lions/' + lion.id)
          .end(function(err, resp) {
            expect(resp.body).to.be.eql(lion)
            done()
          })
      })
  });

  it('should update a lion', function(done) {
    var lion = {
      name: 'Kathirr007',
      age: 34,
      pride: 'The lion king',
      gender: 'male'
    }
    request(app)
      .post('/lions')
      .send(lion)
      .set('Accept', 'application/json')
      // .expect('Content-Type', /json/)
      // .expect(201)
      .end(function(err, resp) {
        var lion = resp.body
        request(app)
          .put('/lions/' + lion.id)
          .send({
            name: 'Kathirr007-02'
          })
          .end(function(err, resp) {
            expect(resp.body.name).to.be.equal('Kathirr007-02')
            done()
          })
      })
  });
});


