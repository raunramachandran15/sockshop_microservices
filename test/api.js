var assert = require('assert');
var request = require('supertest');

console.log(process.env.host);
describe('Cart operations', function () {
    var agent, url = `http://${process.env.host}`;
    before(function (done) {
	console.log('Inside before test and url :', url)
        agent = request(url);
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
