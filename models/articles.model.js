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

function insertComByArticle_id(article_id, username, body){
  
    return db
    .query(
      'INSERT INTO comments (body, article_id, author) VALUES ($1, $2, $3) RETURNING *;',
      [body, article_id, username]
    )
}

function updateArticleByArticle_id(article){
    const {article_id,votes,} = article
    return db
    .query(`
        UPDATE articles
        SET votes = $1
        WHERE article_id = $2 RETURNING *;`,
        [votes, article_id]
        )
}
module.exports = { selectArticleById, selectComByArticle_id,insertComByArticle_id, updateArticleByArticle_id}