const {selectAllUsers, selectUserByUsername} = require('../models/users.model');

function getAllUsers(request, response, next){
    selectAllUsers()
    .then((result)=>{
        return response.status(200).send(result.rows)
    })
    .catch((error)=>{
        next(error)
    })
}

function getUserByUsername(request, response, next){
    const { username } = request.params
    selectUserByUsername(username)
    .then((result)=>{
        console.log(result.rows);
        return response.status(200).send(result.rows)
    })
    .catch((error)=>{
        next(error)
    })
}

module.exports = {getAllUsers, getUserByUsername}