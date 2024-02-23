const { selectArticleById, selectComByArticle_id, insertComByArticle_id, updateArticleByArticle_id, removeComByComment_id, selectAllArticles } = require('../models/articles.model')

function getAllArticles(request, response, next){
    const { topic } = request.query
    selectAllArticles(topic)
    .then((result)=>{
        return response.status(200).send(result.rows)
    })
    .catch((error)=>{
        next(error)
    })
}

function getArticleById(request,response,next){
    const { article_id }= request.params
    selectArticleById(article_id)
    .then((result)=>{
        if (result.rows.length === 0){ //promise reject where article id doesn't exists
            return Promise.reject({status : 404, msg: 'Not Found'})
          }
        else{
            return response.status(200).send(result.rows[0])
        }
    })
    .catch((error)=>{
        next(error)
    })
}

function getComByArticle_id(request,response,next){
    const id = request.params.article_id
    selectComByArticle_id(id)
    .then((result)=>{
        if (result.rows.length === 0){ //promise reject where article id doesn't exists
            return Promise.reject({status : 404, msg: 'Not Found'})
          }
        else{
            return response.status(200).send(result.rows)
        }
    })
    .catch((error)=>{
        next(error)
    })
}
function postComByArticle_id(request,response,next){
    const {article_id} = request.params
    const {username, body} = request.body

    insertComByArticle_id(article_id, username, body)
    .then((result)=>{
     
        if (result.rows.length === 0 ){ //when passed valid id without data in database
            return Promise.reject({status : 404, msg: 'Not Found'})  
        }
        else{
            return response.status(201).send(result.rows[0])
        }
    })
    .catch((error)=>{
           next(error)
    })  
}

function patchVotesByArticle_id(request,response,next){
    const {article_id} = request.params
    const {inc_votes} = request.body
    selectArticleById(article_id)
    .then((result)=>{

       
        if (result.rows.length=== 0){// no contain found with the id
            return Promise.reject({status : 404, msg: 'Not Found'})  
        }
        else{
            const article = result.rows[0]
            article.votes += inc_votes //changing votes accordingly
            return updateArticleByArticle_id(article)
        }
    })
    .then((result)=>{
       return response.status(200).send(result.rows[0])       
    })
    .catch((error)=>{
        next(error)
 })  
}

function deleteComByComment_id(request, response, next){
    const { comment_id } = request.params
    removeComByComment_id(comment_id)
    .then((result) => {
        
        if (result.rows.length === 0){ //promise reject where comment doesn't exists
          return Promise.reject({status : 404, msg: 'Not Found'})
        }
        else {
            return response.status(204).send()
        }
      })
    .catch((error)=>{
        next(error)
    })
}


module.exports = { getArticleById, 
    getComByArticle_id, 
    postComByArticle_id, 
    patchVotesByArticle_id, 
    deleteComByComment_id,
    getAllArticles }
