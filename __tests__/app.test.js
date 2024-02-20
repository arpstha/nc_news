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
    test('should return an array with all the topics', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((response)=>{
            const topics = response.body
            expect(Array.isArray(topics)).toBe(true)
            expect(topics.length).toBe(3)
        })
    });
    test('should return topic objects', () => {
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
    test('should return topic objects with correct properties', () => {
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
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe('Not Found');
          });
    
    });
});

const endPointJson = require('../endpoints.json')
describe('GET /api', () => {
    
        test('should return 200 status code if request is successful', () => {
            return request(app)
            .get('/api/topics')
            .expect(200)
        });
   
    test('should return an object describing all the available endpoints', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((response)=>{
            const resultEndPoints = response.body
            expect(typeof resultEndPoints).toBe('object')
            expect(resultEndPoints).toEqual(endPointJson)
            
        })
    });
});

