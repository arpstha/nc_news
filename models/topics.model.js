const db = require('../db/connection')

function selectAllTopics(){
    return db.query("SELECT * FROM topics")
    
}



module.exports =  selectAllTopics; 