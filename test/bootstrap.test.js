var { user } = require('./data'),
    stsession = require('supertest-session'),
    host = process.env.HOST,
    url = `http://${host}`,
    dbhost = process.env.DBHOST,
    sockshopData = require('./data'),
    agent = stsession(url),
    guestAgent = stsession(url),
    authAgent = {}, db, Cart, Item,
    MongoClient = require('mongodb').MongoClient;

describe('Test suite initialization', function () {
    before(function (done) {
        this.timeout(10000);
        agent
            .post('/register')
            .send({
                "username": "vivek",
                "password": "vivek",
                "email": "arunramachandran15@gmail.com"
            })
            .then(function (res) {
		console.log(res.text);
                done();
            }).catch((err) => {
                console.log(err);
                done(err);
            })
    });
    it('Bootstraping test env done', function (done) {
        done();
    });
    after((done) => {
        MongoClient.connect(`mongodb://${dbhost}:27017`,{useNewUrlParser: true}, async function (err, client) {
            db = client.db('data')
            if (err) throw err;
            Cart = db.collection('cart');
            Item = db.collection('item');
            try {
                let items = await Item.deleteMany({});
                let cartList = await Cart.deleteMany({});
                client.close();
                done()
            } catch (err) {
                console.log(err);
                client.close();
                done(err)
            }
        })
    })
})

