var assert = require('assert'),
    request = require('supertest'),
    stsession = require('supertest-session'),
    sockshopData = require('./data'),
    host =  '13.233.13.86',
    url = `http://${host}`,
    agent = stsession(url),
    authAgent = {};

console.log(process.env.host);
describe('Cart operations with login', function () {
    before(function (done) {
        this.timeout(100000);
        var authorization = Buffer.from(`${sockshopData.user.username}:${sockshopData.user.password}`).toString('base64')
        agent
            .get('/login')
            .set('Accept', /json/)
            .expect('Content-Type', /text/)
            .set('Authorization', `Basic ${authorization}`)
            .expect(200)
            .then(function (res) {
                console.log('User logged in', res.text);
                authAgent = agent;
                done();
            }).catch((err) => {
                console.log(err)
                done(err)
            })
    });
    describe('Cart api test suite', function () {
        it('Add product', function (done) {
            var reque = authAgent.post('/cart')
                .send(sockshopData.product).set('Accept', 'application/json')
                .expect(201)
                .end(function (err, res) {
                    return done(err);
                });
        });
        it('List product', function (done) {
            var reque = authAgent.get('/cart')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    console.log(JSON.parse(res.text));
                    done(err);
                })
        });
    })

});
