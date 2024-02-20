const db = require('../db/connection')
const endPoints = require('../endpoints.json')


function selectAllTopics(){
    return db.query("SELECT * FROM topics")
    
}




module.exports =  selectAllTopics; 
