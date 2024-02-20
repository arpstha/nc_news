const { selectAllTopics } = require('../models/topics.model')
const endPoints = require('../endpoints.json')

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

function getApi(request, responds, next){
    return responds.status(200).send(endPoints)
}

function rejectRequest(request, response, next){
   next({status : 404, msg:'Not Found'});
}

module.exports = { getAllTopics, rejectRequest, getApi };