const db = require('../db/connection')

function selectAllUsers(){
    return db.query(`SELECT * FROM users;`)
}

function selectUserByUsername( username ){
    return db.query(`SELECT * FROM users WHERE username = $1;`,[username]);
}


module.exports = { selectAllUsers, selectUserByUsername }