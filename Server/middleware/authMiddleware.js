const jwt = require('jsonwebtoken')
const User = require('../modles/usermodle')
const asyncHandler = require("express-async-handler")
const dotenv = require("dotenv")

dotenv.config();


const protect = asyncHandler(async (req ,res , next) => {
    let token;

    if (
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    ) try {

        token = req.headers.authorization.split(" ")[1];

        // decodes the token id
        const decode = jwt.verify(token, process.env.JWT_SECRET_KET)

        req.user = await User.findById(decode.id).select("-password")
        next();
    } catch (error) {
        res.status(400).json({Error:"Not Authorized , no token"})
    }

    if (!token) {
        res.status(400).json({Error:"Not Authorized , no token"})
    }
})

module.exports = {protect} ;