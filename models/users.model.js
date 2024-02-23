const db = require('../db/connection')

function selectAllUsers(){
    return db.query(`SELECT * FROM users;`)
}

module.exports = { selectAllUsers }