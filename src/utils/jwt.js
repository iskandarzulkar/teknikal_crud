const jwt = require('jsonwebtoken');

require('dotenv').config();

JWT_SECRET_KEY      = process.env.JWT_SECRET_KEY;
JWT_FERESH_TOKEN    = process.env.JWT_FERESH_TOKEN;

const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '24h' });
};

const fereshToken = (payload) =>{
    return jwt.sign(payload, JWT_FERESH_TOKEN, {expiresIn: '24h'})
}

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET_KEY);
};

module.exports = { generateToken, fereshToken, verifyToken};