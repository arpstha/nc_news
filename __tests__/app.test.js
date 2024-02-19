const db = require('../db/connection')
const data = require('../db/data/test-data/index')
const seed = require('../db/seeds/seed')
const app = require('../app')
const request = require('supertest')

beforeEach(()=> seed(data));
afterAll(()=> db.end());

describe('GET /api/topics', () => {
    test('should return 200 status code if request is successful', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
    });
    test('should return an array', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((response)=>{
            const topics = response.body
            console.log(topics)
            expect(Array.isArray(topics)).toBe(true)
        })
    });
    test('should return treasure objects', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((response)=>{
            const topics = response.body
            topics.forEach(topic => {
                expect(typeof topic).toBe('object')
            });
        })
    });
    test('should return treasure objects with correct properties', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((response)=>{
            const topics = response.body
            topics.forEach(topic => {
                expect(typeof topic.slug).toBe('string')
                expect(typeof topic.description).toBe('string')
            });
        })
    });
    test('should responds with an error invalid request', () => {
        return request(app)
          .get('/api/topics/other')
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe('Bad Request');
          });
    
    });
    test('should responds with an error when request sent with other method than GET', () => {
        return request(app)
          .post('/api/topics')
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe('Bad Request');
          });
    
    });
});