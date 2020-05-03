/**
 * @jest-environment node
 */

const request = require('supertest');
const nock = require('nock');
const app = require('../src/app');
const mockData = require('../src/appMockData');

describe('GET / Homepage', () => {
  it('should respond with some homepage markup', done => {
    request(app)
      .get('/')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('Welcome to my jokes API!');
        done();
      });
  });
});

describe('GET / jokes', () => {
  it('GET / should serve all jokes!', done => {
    nock('https://api.icndb.com')
      .get('/jokes')
      .reply(200, mockData.mockJokesList);

    request(app)
      .get('/jokes')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.jokes).toEqual(mockData.mockJokesList.value);
        done();
      });
  });
  it('should responde with an error message if something goes wrong', done => {
    nock('https://api.icndb.com')
      .get('/jokes')
      .replyWithError({ statusCode: 500, message: 'huge error' });

    request(app)
      .get('/jokes')
      .then(res => {
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toEqual('huge error');
        done();
      });
  });
});

describe('GET / jokes/random', () => {
  it('GET / should serve a random joke!', done => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .reply(200, mockData.mockRandomJoke);

    request(app)
      .get('/jokes/random')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.randomJoke).toEqual(mockData.mockRandomJoke.value);
        done();
      });
  });
  it('should responde with an error message if something goes wrong', done => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .replyWithError({ statusCode: 500, message: 'huge error' });

    request(app)
      .get('/jokes/random')
      .then(res => {
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toEqual('huge error');
        done();
      });
  });
});

describe('GET / jokes/random/personal', () => {
  it('GET / should serve a personalised joke for {first} {last}!', done => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'first', lastName: 'last' })
      .reply(200, mockData.mockPersonalJoke);
    request(app)
      .get('/jokes/random/personal/first/last')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.personalJoke).toEqual(mockData.mockPersonalJoke.value);
        done();
      });
  });
  it('should responde with an error message if something goes wrong', done => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'first', lastName: 'last' })
      .replyWithError({ statusCode: 500, message: 'Bad request' });

    request(app)
      .get('/jokes/random/personal/first/last')
      .then(res => {
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toEqual('Bad request');
        done();
      });
  });
});
