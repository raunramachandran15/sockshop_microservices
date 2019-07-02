var chai = require('chai');
var chaiHttp = require('chai-http');
var server = "http://localhost:3000"
var should = chai.should();

var request = require('supertest');
chai.use(chaiHttp);
const userCredentials = {
            username: 'admin', 
            password: 'password'
        }
var authenticatedUser = request.agent(server);
before(function(done){
      authenticatedUser
        .post('/todo/users/login')
        .send(userCredentials)
        .end(function(err, res){
            res.body.should.have.property('message').eql('Login Successfully');
            Token = res.body.content[0].token
          res.should.have.status(200);
          done();
        });
    });
describe('User module test case', function() {
      it('add', function(done) {
          chai.request(server)
            .post('/todo/users/addcoin')
            .send({name:"ameen",price:"10"})
            .set('Authorization',Token)
            .end(function(err, res){
              res.should.have.status(200);
              res.body.should.be.a('object');
              done();
            });
        });    
  it('getCoinAll', function(done) {
      chai.request(server)
        .get('/todo/users/getcoin')
        .set('Authorization',Token)
        .end(function(err, res){
            //console.log('getCoinAll>>>>',res.body.content[0].id)
            lastId = res.body.content[0].id
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
 it('getCoinOne', function(done) {
      chai.request(server)
        .get('/todo/users/edit/'+lastId)
        .set('Authorization',Token)
        .end(function(err, res){
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
 it('edit', function(done) {
      chai.request(server)
        .post('/todo/users/update/'+lastId)
        .send({name:"updated",price:"100"})
        .set('Authorization', Token)
        .end(function(err, res){
          res.should.have.status(200);
          done();
        });
    });
 
 it('delete', function(done) {
      chai.request(server)
        .get('/todo/users/delete/'+lastId)
        .set('Authorization', Token)
        .end(function(err, res){
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
});


var chai = require('chai');
var chaiHttp = require('chai-http');
var server = "http://13.233.13.86"
var should = chai.should();
chai.use(chaiHttp);
var chaiAgent = chai.agent.request(server);


describe('#########Cart operations with CHAI ****************', function () {

    describe('Chai  api test suite', function () {
        it('Add product', function (done) {
            var reque = chaiAgent.post('/cart')
                .send(sockshopData.product)
                .expect(201)
                .end(function (err, res) {
                    return done(err);
                });
        });
        it('CHAI List product', function (done) {
            var reque = chaiAgent.get('/cart')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    console.log(JSON.parse(res.text));
                    done(err);
                })
        });
    })

});