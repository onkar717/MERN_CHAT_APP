const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();


const generatetoken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET_KET , {
        expiresIn:"365d"
    })
}

module.exports = generatetoken;