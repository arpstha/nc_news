const db = require('../db/connection')
const data = require('../db/data/test-data/index')
const seed = require('../db/seeds/seed')
const app = require('../app')
const request = require('supertest')
const endPointJson = require('../endpoints.json')

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
            // expect(resultEndPoints).toEqual(endPointJson)
            
        })
    });
});

describe('GET /api/articles/:article_id', () => {
    test('should return an article object with status 200 if successful', () => {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then((response)=>{
            const article = response.body
            expect(typeof article).toBe('object')
        })
    });
    test('should return an article object with all the article properties', () => {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then((response)=>{
            const article = response.body
           
            expect(typeof article.author).toBe('string')
            expect(typeof article.title).toBe('string')
            expect(typeof article.article_id).toBe('number')
            expect(typeof article.body).toBe('string')
            expect(typeof article.topic).toBe('string')
            expect(typeof article.created_at).toBe('string')
            expect(typeof article.votes).toBe('number')
            expect(typeof article.article_img_url).toBe('string')
        })
    });
    test("should response with appropiate error message if provided article_id which doesn't exits", () => {
        return request(app)
        .get('/api/articles/1000')
        .expect(404)
        .then((response)=>{
            expect(response.body.msg).toBe('Not Found');
        })
    });
    test("should response with error message if invalid article_id is given", () => {
        return request(app)
        .get('/api/articles/notValid')
        .expect(400)
        .then((response)=>{
            expect(response.body.msg).toBe('Bad Request');
        })
    });
    
});