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

function insertComByArticle_id(article_id, username, body, article,){
   
        const { votes, created_at} = article

        return db
        .query(
          'INSERT INTO comments (body, article_id, author,votes,created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
          [body, article_id, username, votes, created_at]
        )

    
}
module.exports = { selectArticleById, selectComByArticle_id, insertComByArticle_id }