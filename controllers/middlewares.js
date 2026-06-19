const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
const Blog = require('../models/Blog');
const Sessions = require('../models/Sessions');
const { BCRYPT_SALT, SECRET } = require('../util/config');

const checkSessionToken = async(req, res, next) => {
    const sessionToken = await Sessions.findOne({
        where: {
            token: req.token
        }
    })
    if (!sessionToken) {
        return res.status(401).json({ error: "Token disabled" });
    }
    next();
}


const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id);
    if (!req.blog) {
        return res.status(404).end();
    }
    next();
}

const errorHandler = (error, req, res, next) => {
    console.error(error.message);
    return res.status(400).json({ error: error.message });
}


const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
            req.token = authorization.substring(7);
        } catch (error) {
            console.log(error.message);
            console.log(error.message);
            return res.status(401).json({ error: 'token invalid' })
        }
    } else {
        return res.status(401).json({ error: 'token missing' });
    }
    next();
}

const userFinder = async (req, res, next) => {
    user = await User.findOne({
        where: {
            id: req.decodedToken.id
        },
        attributes: {
            exclude: ['password']
        }
    });
    if (!user) {
        return res.status(404).json({ error: "Invalid user" });
    }
    req.user = user;
    next();
}


module.exports = {
    checkSessionToken,
    blogFinder,
    errorHandler,
    tokenExtractor,
    userFinder
}