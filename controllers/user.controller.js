const {selectAllUsers} = require('../models/users.model');

function getAllUsers(request, response, next){
    selectAllUsers()
    .then((result)=>{
        console.log(result.rows)
        return response.status(200).send(result.rows)
    })
    .catch((error)=>{
        next(error)
    })
}

module.exports = {getAllUsers}