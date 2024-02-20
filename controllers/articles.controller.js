const selectArticleById = require('../models/articles.model')

function getArticleById(request,response,next){
    const id = request.params.article_id
    selectArticleById(id)
    .then((result)=>{
        if (result.rows.length === 0){ //promise reject where article id doesn't exists
            return Promise.reject({status : 404, msg: 'Not Found'})
          }
        else{
        }
        return response.status(200).send(result.rows[0])
    })
    .catch((error)=>{
        next(error)
    })
}

module.exports = getArticleById;
