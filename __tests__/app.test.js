const request = require('supertest');
const nock = require('nock');
const app = require('../src/app');

it('GET / should respond with welcome message', done => {
  request(app)
    .get('/')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('Welcome to my Jokes API!');
      done();
    });
});
it('GET / should respond with all jokes', done => {
  const mockResponse = {
    type: 'success',
    value: [
      {
        id: 1,
        joke: 'i am a joke',
        categories: [],
      },
      {
        id: 2,
        joke: 'i am another joke',
        categories: [],
      },
    ],
  };
  nock('https://api.icndb.com')
    .get('/jokes')
    .reply(200, mockResponse);

  request(app)
    .get('/jokes/*')
    .then(res => {
      nock('https://api.icndb.com')
        .get('/jokes')
        .reply(200, mockResponse);
      expect(res.statusCode).toEqual(200);
      expect(res.body.jokes).toEqual([
        {
          categories: [],
          id: 1,
          joke: 'i am a joke',
        },
        {
          categories: [],
          id: 2,
          joke: 'i am another joke',
        },
      ]);
      done();
    });
});

it('GET / should respond with a random joke', done => {
  const mockResponse = {
    type: 'success',
    value: {
      id: 115,
      joke: 'i am a random joke',
      categories: [],
    },
  };
  nock('https://api.icndb.com')
  .get('/random')
  .query({ exclude: '[explicit]' })
  .reply(200, mockResponse);
  request(app)
    .get('/jokes/*')
    .then(res => {
      nock('https://api.icndb.com')
        .get('/jokes')
        .reply(200, mockResponse);
      expect(res.statusCode).toEqual(200);
      expect(res.body.randomJoke).toEqual([
        {
          categories: [],
          id: 1,
          joke: 'i am a random joke',
        },
        {
          categories: [],
          id: 2,
          joke: 'i am another random joke',
        },
      ]);
      done();
    });
})