/**
 * @jest-environment node
 */

const request = require('supertest');
const nock = require('nock');
const app = require('../src/app');
const mockResponse = require('../src/mockResponse.js');

const api = 'https://api.icndb.com';
const mockError = { statusCode: 500, message: 'Error responding' };
const errFunc = res => {
  expect(res.statusCode).toEqual(500);
  expect(res.body.error).toEqual(mockError.message);
};

describe('GET / Homepage', () => {
  it('should respond with some homepage markup', done => {
    request(app)
      .get('/')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('Welcome to my Jokes API Page!');
        done();
      });
  });
});
describe('GET /jokes', () => {
  it('GET /jokes should respond with all jokes', async () => {
    nock(api)
      .get('/jokes')
      .reply(200, mockResponse.mockResponseJokes);

    request(app)
      .get('/jokes')
      .then(res => {
        nock(api)
          .get('/jokes')
          .reply(200, mockResponse);
        expect(res.statusCode).toEqual(200);
        expect(res.body.jokes).toEqual(mockResponse.mockResponseJokes.value);
      });
  });
  it('should respond with an error message if something goes wrong', async () => {
    nock(api)
      .get('/jokes')
      .replyWithError(mockError);

    request(app)
      .get('/jokes')
      .then(res => {
        return errFunc(res);
      });
  });
});

describe('GET /jokes/random', () => {
  it('GET /jokes/random should respond with a random joke', async () => {
    nock(api)
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .reply(200, mockResponse.mockResponseRandom);

    request(app)
      .get('/jokes/random')
      .then(res => {
        nock(api)
          .get('/jokes/random')
          .reply(200, mockResponse);

        expect(res.statusCode).toEqual(200);
        expect(res.body.randomJoke).toEqual(mockResponse.mockResponseRandom.value);
      });
  });
  it('should respond with an error message if something goes wrong', async () => {
    nock(api)
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .replyWithError(mockError);

    request(app)
      .get('/jokes/random')
      .then(res => {
        return errFunc(res);
      });
  });
});

describe('GET /jokes/random/personal', () => {
  it('GET /jokes/random/personal should respond with a personal joke', async () => {
    nock(api)
      .get('/jokes/random') // personal
      .query({ exclude: '[explicit]', firstName: 'first', lastName: 'last' })
      .reply(200, mockResponse.mockResponsePersonal);

    request(app)
      .get('/jokes/random/personal/first/last')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.personalJoke).toEqual(mockResponse.mockResponsePersonal.value);
      });
  });

  it('should respond with an error message if something goes wrong', async () => {
    nock(api)
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'first', lastName: 'last' })

      .replyWithError(mockError);

    request(app)
      .get('/jokes/random/personal/first/last')
      .then(res => {
        return errFunc(res);
      });
  });
});
