const selectAllTopics = require('../models/topics.model')

function getAllTopics(request,response,next){
    selectAllTopics()
    .then((result)=>{
        const topics = result.rows; 
        return response.status(200).send(topics)
    })
    .catch((error)=>{
        next(error)
    })
}

function rejectRequest(request, response, next){
   next({status : 400, msg:'Bad Request'});
}

module.exports = { getAllTopics, rejectRequest };