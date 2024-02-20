const express = require('express');
const app = express();
const {getAllTopics, rejectRequest, getApi} = require('./controllers/topics.controller')

const { getArticleById, getComByArticle_id} = require('./controllers/articles.controller')


app.use(express.json());

app.get('/api/topics', getAllTopics);
app.get('/api/topics/:invalid', rejectRequest);

app.get('/api', getApi);


app.get('/api/articles/:article_id', getArticleById)
app.get('/api/articles/:article_id/comments', getComByArticle_id)


app.use((error, request, response, next) => {
       if (error.status && error.msg){
        response.status(error.status).send({msg:error.msg})
    }
    else if (error.code === '22P02'){
        response.status(400).send({msg:'Bad Request'})
    }
    else{
        next(error) // if error doesn't match move to next
    }
  
});
  //for all other errors
  app.use((error, request, response, next) => {
    response.status(error.status).send({msg:error.msg})
  });

module.exports = app;