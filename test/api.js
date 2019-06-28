var assert = require('assert');
var request = require('supertest');

describe('Cart operations', function () {
    var agent;
    before(function (done) {
        agent = request('http://172.17.0.1');
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
                    console.log(err, res.body);
                    done(err);
                });
        });
    });
});
