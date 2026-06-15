const express = require('express');
const userRouter = express.Router();
const {User} = require('../models/index');
const bcrypt = require('bcrypt');
const {BCRYPT_SALT, SECRET} = require('../util/config');
const jwt = require('jsonwebtoken');



const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        try {
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
        } catch(error){
            return res.status(401).json({error: 'token invalid'})
        }
    } else {
        return res.status(401).json({error: 'token missing'});
    }
    next();
}



const errorHandler = (error, req, res, next) => {
    console.log(error.message);
    if(error.errors[0].validatorKey === 'isEmail'){
        return res.status(400).json({error: "username must be a valid email address"})
    }
    res.status(400).json({error: error.message});
}


userRouter.get("/", async(req, res) => {
    const users = await User.findAll({
        attributes: {
            exclude: ['password']
        }
    });
    res.json(users);
})



userRouter.post("/new", async(req, res, next) => {
    const {name, username, password} = req.body;
    console.log(req.body);
    console.log(BCRYPT_SALT);
    const hashed = await bcrypt.hash(password, Number(BCRYPT_SALT));
    try {
        const user = await User.create({name, username, password: hashed});
        const userWithOutPassword = user.toJSON();
        delete userWithOutPassword.password;
        res.json(userWithOutPassword);
    } catch(error) {
        next(error);
    }
})

userRouter.post("/login", async(req, res, next) => {
    const userInfo = req.body;
    const user = await User.findOne({
        where: {
            username : userInfo.username
        }
    });
    if(!user) {
        return res.json({error: "user not found"});
    }
    const passwordCorrect = await bcrypt.compare(userInfo.password, user.password);
    if(!passwordCorrect){
        return res.json({error: "Invalid password"});
    }
    const forToken = {
        username : user.username,
        id: user.id
    };
    const token = await jwt.sign(forToken, SECRET);
    res.status(200).json({
        token,
        username: user.username,
        name: user.name
    });
});

userRouter.put("/update", tokenExtractor, async(req, res) => {
    const user = await User.findOne({
        where : {
            id : req.decodedToken.id
        },
        attributes : {
            exclude: ['password']
        }
    });
    if(!user) {
        return res.status(404).json({error : "Invalid user"});
    }
    user.username = req.body.username;
    user.save();
    res.json(user);
})

userRouter.use(errorHandler);
module.exports = {
    userRouter,
    tokenExtractor
};