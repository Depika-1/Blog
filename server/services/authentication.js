const jwt = require('jsonwebtoken')
const secret_key='secret_45'

const createUserToken=(user)=>{
    const payload={
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role
    }
    const token=jwt.sign(payload,secret_key)
    return token
}

const validateToken=(token)=>{
    const payload=jwt.verify(token,secret_key)
    return payload
}

module.exports={
    createUserToken,
    validateToken
}