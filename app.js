const express = require('express');
const app = express();
const {getAllTopics, rejectRequest, getApi} = require('./controllers/topics.controller')

const { getArticleById, getComByArticle_id, postComByArticle_id, patchVotesByArticle_id} = require('./controllers/articles.controller')


app.use(express.json());

app.get('/api/topics', getAllTopics);

app.get('/api', getApi);

app.get('/api/articles/:article_id', getArticleById)

app.get('/api/articles/:article_id/comments', getComByArticle_id)

app.post('/api/articles/:article_id/comments', postComByArticle_id)

app.patch('/api/articles/:article_id', patchVotesByArticle_id)

app.get('/*', rejectRequest); // rejects all other invalid requests
app.use((error, request, response, next) => {

    //custom error
    if (error.status && error.msg){
       response.status(error.status).send({msg:error.msg})
    }
    //Invalid endpoint
    else if (error.code === '22P02'){
        response.status(404).send({msg:'Not Found'})
    }
    //Data missing
    else if (error.code === '23502'){
      response.status(400).send({msg:'Missing username or comment'})
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