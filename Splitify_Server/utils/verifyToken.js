const jwt = require('jsonwebtoken');
const userRegister = require('../Models/RegisterSchema.js')
const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(400).send('Authorization headers not present');
        }
        const token = header.split(' ')[1];
        if (!token) {
            return res.status(400).send({
                message: "Token not present",
            })

        }
        jwt.verify(token, process.env.TokenKey, async (error, decoded) => {
            if (error) {
                console.log(error);
                return res.status(400).send({
                    message: 'Invalid token'
                })
            }
            req.user = await userRegister.findById(decoded._id).select('-password');

            next();
        })
    } catch (error) {
        console.log(error);
        res.status(400).send('Invalid token')
    }
}

module.exports = verifyToken;
