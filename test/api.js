var assert = require('assert');
var request = require('supertest');
var http_call = require('request');
http_call('http://localhost/cart', function (error, response, body) {
  console.log('error:', error); 
  console.log('statusCode:', response && response.statusCode); 
  console.log('body:', body); 
});


describe('Cart operations', function () {

	var  agent;
	before(function (done) {
		agent = request('http://localhost');
		  done();
    });
    
    describe('🙏  add product to cart', function () {
        it('product should be added', function (done) {
            agent
                .post('/cart')
                .send({
                    "id": "03fef6ac-1896-4ce8-bd69-b798f85c6e0b"
                })
                .expect(201)
                .end(function (err, res) {
                    done(err);
                });
        });
        it('single product should be listed', function (done) {
            agent
                .get('/cart')
                .expect(200)
                .end(function (err, res) {
                    console.log(err,res.body);
                    done(err);
                });
        });
    });

});
