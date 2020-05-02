const request = require('supertest');
const app = require('../src/app');

it('GET / should respond with a welcome message!', done => {
  request(app)
    .get('/')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('Welcome to my jokes API!');
      done();
    });
});
it('GET / should serve all jokes!', done => {
  request(app)
    .get('/jokes')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ message: 'This is the all jokes endpoint' });
      done();
    });
});
it('GET / should serve a random joke!', done => {
  request(app)
    .get('/joke/random')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ message: 'This is a random joke endpoint' });
      done();
    });
});
it('GET / should serve a personalised joke for {first} {last}!', done => {
  request(app)
    .get('/joke/random/personal/first/last')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ message: `This is a jokes endpoint for first last` });
      done();
    });
});
it('GET / should serve a personalised joke for {first} {last}!', done => {
  request(app)
    .get('/joke/random/personal/Aniko/Veiszhab')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ message: `This is a jokes endpoint for Aniko Veiszhab` });
      done();
    });
});
