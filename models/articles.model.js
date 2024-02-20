const db = require('../db/connection')

function selectArticleById(id){
    return db.query(`SELECT * 
    FROM articles 
    WHERE article_id = $1`
    ,[id])
   
    
}
function selectComByArticle_id(id){
    return db.query(`
        SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.article_id 
        FROM articles 
        JOIN comments
        ON articles.article_id = comments.article_id
        WHERE articles.article_id = $1
        ORDER BY comment_id DESC;
    `, [id]);
} 
module.exports = { selectArticleById, selectComByArticle_id }