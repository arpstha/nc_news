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
    test('should return an array with all topic objects', () => {
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
            .get('/api')
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
            expect(typeof article.comment_count).toBe('number')
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

describe('GET /api/articles/:article_id/comments', () => {
    test('should return status 200 with an array of comments objects', () => {
        return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then((response)=>{
            const comments = response.body
            expect(Array.isArray(comments)).toBe(true)
            expect(comments.length).toBe(11)
        })
    });
    test('should return an array of comments with objects with all the required properties', () => {
        return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then((response)=>{
            const comments = response.body
            comments.forEach((comment)=>{
                expect(typeof comment.comment_id).toBe('number')
                expect(typeof comment.votes).toBe('number')
                expect(typeof comment.created_at).toBe('string')
                expect(typeof comment.author).toBe('string')
                expect(typeof comment.body).toBe('string')
                expect(typeof comment.article_id).toBe('number')

            })
        })
    });
    test("should response with empty array if article_id doesn't exits", () => {
        return request(app)
        .get('/api/articles/1000/comments')
        .expect(200)
        .then((response)=>{
            expect(response.body.length).toBe(0);
        })
    });
    test("should response with error message if invalid article_id is given", () => {
        return request(app)
        .get('/api/articles/notValid/comments')
        .expect(400)
        .then((response)=>{
            expect(response.body.msg).toBe('Bad Request');
        })
    });
    test("should response with an empty array if the article_id doesn't have comments", () => {
        return request(app)
        .get('/api/articles/2/comments')
        .expect(200)
        .then((response)=>{
            expect(response.body.length).toBe(0);
        })
    });
    
});

describe('GET /api/articles(topic query)', () => {
    test('should return an article array with status 200 with correct length', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then((response)=>{
            const article = response.body
            expect(Array.isArray(article)).toBe(true)
            expect(article.length).toBe(13)
        })
    });
    test('should return array of article objects with all the article properties', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then((response)=>{
            const articles = response.body
            articles.forEach((article)=>{
                expect(typeof article.author).toBe('string')
                expect(typeof article.title).toBe('string')
                expect(typeof article.article_id).toBe('number')
                expect(typeof article.topic).toBe('string')
                expect(typeof article.created_at).toBe('string')
                expect(typeof article.votes).toBe('number')
                expect(typeof article.article_img_url).toBe('string')
                expect(typeof article.comment_count).toBe('number')
            })
        })
    });
    test('should return all the articles sorted by date in descending order.',()=>{
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then((response)=>{
            const articles = response.body
            expect(articles).toBeSortedBy('created_at', {descending: true})
        })
    });
    test('should return all the articles with correct lenght if optional query "topic" is made', () => {
        return request(app)
        .get('/api/articles?topic=mitch')
        .expect(200)
        .then((response)=>{
            const articles = response.body
            expect(articles.length).toBe(12)
        })
    });
    test('should only return all the articles related to that query topic', () => {
        return request(app)
        .get('/api/articles?topic=mitch')
        .expect(200)
        .then((response)=>{
            const articles = response.body
            articles.forEach((article)=>{
                expect(article.topic).toBe('mitch')
            })
        })
    });
    test("should response status 200 and an empty array if provided topic doesn't relate to any articles", () => {
        return request(app)
        .get('/api/articles?topic=paper')
        .expect(200)
        .then((response)=>{
            expect(response.body).toEqual([]);
        })
    });
});

describe('POST /api/articles/:article_id/comments', () => {
    test('should return status 201 with posted comment object', () => {
        const newComment = {
        username : 'butter_bridge',
        body: "This is beautiful but does this rings the bell? I certainly won't let it go"
        };
        return request(app)
        .post('/api/articles/1/comments')
        .send(newComment)
        .expect(201)
        .then((response) => {
            expect(response.body.comment_id).toBe(19);
            expect(response.body.author).toBe('butter_bridge');
            expect(response.body.body).toBe("This is beautiful but does this rings the bell? I certainly won't let it go");
            expect(response.body.article_id).toBe(1);
            expect(response.body.votes).toBe(0);
            expect(typeof response.body.created_at).toBe('string');
        });
    });
    test('should ingore other properties except username and body', () => {
        const newComment = {
        username : 'butter_bridge',
        body: "This is beautiful but does this rings the bell? I certainly won't let it go",
        votes : 100,
        created_at : "2020-03-01T01:13:00.000Z",
        };
        return request(app)
        .post('/api/articles/1/comments')
        .send(newComment)
        .expect(201)
        .then((response) => {
            expect(response.body.comment_id).toBe(19);
            expect(response.body.author).toBe('butter_bridge');
            expect(response.body.body).toBe("This is beautiful but does this rings the bell? I certainly won't let it go");
            expect(response.body.article_id).toBe(1);
            expect(response.body.votes).toBe(0);
            expect(typeof response.body.created_at).toBe('string');
        });
    });
    test("should responds with an appropriate status and error message when provided username doesn't exits indatabase", () => {
        return request(app)
          .post('/api/articles/1/comments')
          .send({
            username : 'invalid_user',
            body: 'This is where we all come together and clap.'
          })
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe("Not Found");
          });
    });
    test('should responds with an appropriate status and error message when provided with no username', () => {
        return request(app)
          .post('/api/articles/1/comments')
          .send({
            body: 'This is where we all come together and clap.'
          })
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe('Bad Request');
          });
    });
    test('should responds with an appropriate status and error message when provided with no comment body', () => {
        return request(app)
          .post('/api/articles/1/comments')
          .send({
            username: 'butter_bridg'
          })
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe('Bad Request');
          });
    });
    test('should responds with an appropriate status and error message when no information is sent along with request', () => {
        return request(app)
          .post('/api/articles/1/comments')
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe('Bad Request');
          });
      });
    test('should responds with an appropriate status and error message when provided with invalid article_id', () => {
        const newComment = {
            username : 'butter_bridge',
            body: "This is beautiful but does this rings the bell? I certainly won't let it go"
            };
            return request(app)
            .post('/api/articles/invalid/comments')
            .send(newComment)
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe('Bad Request');
        });
    });
    test('should responds with an appropriate status and error message when provided with valid article_id but no content in database', () => {
        const newComment = {
            username : 'butter_bridge',
            body: "This is beautiful but does this rings the bell? I certainly won't let it go"
            };
            return request(app)
            .post('/api/articles/999/comments')
            .send(newComment)
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toBe('Not Found');
        });
    });
});

describe('PATCH /api/articles/:article_id', () => {
    test('should return status 200 with updated article', () => {
        const newVote = { inc_votes : 1 };
        const expectedResultArticle = {
            article_id: 3,
            title: 'Eight pug gifs that remind me of mitch',
            topic: 'mitch',
            author: 'icellusedkars',
            body: 'some gifs',
            created_at: '2020-11-03T09:12:00.000Z',
            votes: 1,
            article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
          }
            return request(app)
            .patch('/api/articles/3')
            .send(newVote)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(expectedResultArticle);
            });
    });
    test("should increment the current article's vote correctly", () => {
        const newVote = { inc_votes : 5 };
        const expectedResultArticle = {
            article_id: 1,
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'I find this existence challenging',
            created_at: '2020-07-09T20:11:00.000Z',
            votes: 105,
            article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
          }
            return request(app)
            .patch('/api/articles/1')
            .send(newVote)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(expectedResultArticle);
            });
    });
    test("should decrement the current article's vote correctly", () => {
        const newVote = { inc_votes : -15 };
        const expectedResultArticle = {
            article_id: 1,
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'I find this existence challenging',
            created_at: '2020-07-09T20:11:00.000Z',
            votes: 85,
            article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
          }
            return request(app)
            .patch('/api/articles/1')
            .send(newVote)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(expectedResultArticle);
            });
    });
    test('should ignore any other information pass on with the request except Votes', () => {
        const newVote = { inc_votes : 5, 
            title: 'change the world',
            topic: 'soup',
            author: 'lollipop',
            body: 'pink elephant',
            created_at: 'afternoon before evening',};
        const expectedResultArticle = {
            article_id: 3,
            title: 'Eight pug gifs that remind me of mitch',
            topic: 'mitch',
            author: 'icellusedkars',
            body: 'some gifs',
            created_at: '2020-11-03T09:12:00.000Z',
            votes: 5,
            article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
          }       
            return request(app)
            .patch('/api/articles/3')
            .send(newVote)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(expectedResultArticle);
            });
    });
    test('should responds with an appropriate status and error message when provided with invalid vote type', () => {
        const newVote = { inc_votes : 'five' };
            return request(app)
            .patch('/api/articles/1')
            .send(newVote)
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe('Bad Request');
        });
    });
    test('should responds with an appropriate status and error message when provided with invalid article_id', () => {
        const newVote = { inc_votes : 1 };
            return request(app)
            .patch('/api/articles/invalid')
            .send(newVote)
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe('Bad Request');
        });
    });
    test('should responds with an appropriate status and error message when provided with article_id with no contents in database', () => {
        const newVote = { inc_votes : 1 };
            return request(app)
            .patch('/api/articles/999')
            .send(newVote)
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toBe('Not Found');
        });
    });
    test('should responds with an appropriate status and error message when no information is sent along with request', () => {
            return request(app)
            .patch('/api/articles/1')
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe('Bad Request');
        });
    });
    test('should responds with an appropriate status and error message when no vote information is sent with request', () => {
            const newVote = { title : "Living in the shadow of a great man"};
            return request(app)
            .patch('/api/articles/1')
            .send(newVote)
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe('Bad Request');
        });
    });
    test('should responds with an appropriate status and error message provided with invalid endpoint and invalid data type', () => {
        const newVote = { inc_votes : 'one' };
        return request(app)
        .patch('/api/articles/not_valid')
        .send(newVote)
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('Bad Request');
    });
});

}); 

describe('DELETE /api/comments/:comment_id', () => {
    test('should return status 204 with message No Content', () => {
        return request(app)
        .delete('/api/comments/3')
        .expect(204)
    });
    test('should responds with an appropriate status and error message when given a non-existent id', () => {
        return request(app)
          .delete('/api/comments/500')
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe('Not Found');
          });
    });
    test('should responds with an appropriate status and error message when given an invalid id', () => {
        return request(app)
          .delete('/api/comments/invalid_comment')
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe('Bad Request');
          });
    });
});
describe('GET /api/users', () => {
    test('should return 200 status code if request is successful', () => {
        return request(app)
        .get('/api/users')
        .expect(200)
    });
    test('should return an array with all the users', () => {
        return request(app)
        .get('/api/users')
        .expect(200)
        .then((response)=>{
            const users = response.body
            expect(Array.isArray(users)).toBe(true)
            expect(users.length).toBe(4)
        })
    });
    test('should return an array with all user objects', () => {
        return request(app)
        .get('/api/users')
        .expect(200)
        .then((response)=>{
            const users = response.body
            users.forEach(user => {
                expect(typeof user).toBe('object')
            });
        })
    });
    test('should return user objects with correct properties', () => {
        return request(app)
        .get('/api/users')
        .expect(200)
        .then((response)=>{
            const users = response.body
            users.forEach(user => {
                expect(typeof user.username).toBe('string')
                expect(typeof user.name).toBe('string')
                expect(typeof user.avatar_url).toBe('string')
            });
        })
    });
});


