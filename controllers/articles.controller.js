const { selectArticleById, selectComByArticle_id, insertComByArticle_id } = require('../models/articles.model')

function getArticleById(request,response,next){
    const id = request.params.article_id
    selectArticleById(id)
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

    selectArticleById(article_id)
    .then((result)=>{
        if (result.rows.length === 0){ //when passed invalid article_id
            return Promise.reject({status : 400, msg: 'Bad Request'})  
        }
        else{
            const article = result.rows[0]
            return insertComByArticle_id(article_id, username, body, article)
            }
        })
    .then((result)=>{
            return response.status(201).send(result.rows[0])
               
    })
    .catch((error)=>{
           next(error)
    })
    
       
    
   
}

module.exports = { getArticleById, getComByArticle_id, postComByArticle_id }
