var assert = require('assert'),
 request = require('supertest'),
 {user} = require('./data'),
 url = `http://${process.env.HOST}`,
 agent = request(url);

console.log('User data : ',user);
before(function (done) {
    this.timeout(10000);
    console.log('Test setup for url :', url)
    agent
    .post('/register')
    .send({
        "username": "vivek",
        "password": "vivek",
        "email": "arunramachandran15@gmail.com"
      })
    .then(function(res) {
        console.log('User created')
        done();
    }).catch((err)=>{
        console.log(err);
        done(err);
    })
});