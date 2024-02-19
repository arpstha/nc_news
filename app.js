const express = require('express');
const app = express();
const {getAllTopics, rejectRequest} = require('./controllers/topics.controller')

app.use(express.json());

app.get('/api/topics', getAllTopics);
app.get('/api/topics/:invalid', rejectRequest);
app.post('/api/topics', rejectRequest);


app.use((error, request, response, next) => {
    
   
    if (error.status && error.msg){

        response.status(error.status).send({msg:error.msg})
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