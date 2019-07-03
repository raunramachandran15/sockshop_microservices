var assert = require('assert'),
    request = require('supertest'),
    assert = require("assert"),
    stsession = require('supertest-session'),
    assert = require('chai').assert,
    sockshopData = require('./data'),
    host = '13.233.13.86',
    url = `http://${host}`,
    agent = stsession(url),
    authAgent = {};

var MongoClient = require('mongodb').MongoClient;
// Connect to the db
MongoClient.connect("mongodb://carts-db:27017/data", function (err, client) {
     var db = client.db('data')
     if(err) throw err; 

     console.log('Mongodb connected to mongodb://carts-db:27017/data')
     const collection = db.collection('cart');
     //Remove cart documents
     collection.remove({}).then(function(err, docs) {
        console.log("Removed all cart documents from db");
     });
});



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
    describe('Add first product to cart and check', function () {
        it('Add first product', function (done) {
            authAgent.post('/cart')
                .send(sockshopData.product).set('Accept', 'application/json')
                .expect(201)
                .end(function (err, res) {
                    return done(err);
                });
        });
        it('Added product is the only item in cart', function (done) {
            authAgent.get('/cart')
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /text/)
                .expect(function (res) {
                    var cartItems = JSON.parse(res.text)
                    assert.equal(cartItems[0].itemId, sockshopData.product.id);
                    assert.equal(cartItems[0].quantity, 1);
                })
                .end(done)
        });
        it('Update the quantity of product in cart', function (done) {
            var product = sockshopData.product;
            product.quantity = 10;
            var reque = authAgent.post(`/cart/update`)
                .send(product)
                .set('Accept', 'application/json')
                .expect(202)
                .end(function (err, res) {
                    //connect to DB and check if exists or not
                    return done(err);
                });
        });
        it('Get productand check quantity of product in cart', function (done) {
            var product = sockshopData.product;
            product.quantity = 10;
            var reque = authAgent.get(`/cart`)
                .set('Accept', 'application/json')
                .expect(200)
                .expect(function (res) {
                    var cartItems = JSON.parse(res.text)
                    assert.equal(cartItems[0].itemId, sockshopData.product.id);
                    assert.equal(cartItems[0].quantity, 10);
                })
                .end(function (err, res) {
                    return done(err);
                });
        });
        it('Delete the product in cart', function (done) {
            var reque = authAgent.delete(`/cart/${sockshopData.product.id}`)
                .set('Accept', 'application/json')
                .expect(202)
                .end(function (err, res) {
                    return done(err);
                });
        });

    })

});



