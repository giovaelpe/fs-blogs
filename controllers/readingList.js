const express = require('express');
const listRouter = express.Router();
const User = require('../models/User');
const Blog = require('../models/Blog');
const ReadingList = require('../models/ReadingList');
const {tokenExtractor} = require('./users');


listRouter.get('/', async(req, res) => {
    const readingList = await ReadingList.findAll();
    res.json(readingList);
})

listRouter.put('/:id', tokenExtractor, async(req, res) => {
    const listItem = await ReadingList.findByPk(req.params.id);
    if(listItem.userId !== req.decodedToken.id){
        return res.status(401).json({error: "not authorized"});
    }
    listItem.read = req.body.read;
    await listItem.save();
    res.sendStatus(201);
})


listRouter.post('/', async(req, res) => {
    const {blogId, userId} = req.body;
    const user = await User.findByPk(userId);
    const blog = await Blog.findByPk(blogId);
    if(!user || !blog) {
        return res.status(404).json({error: "Not found"});
    }
    const newItem = await ReadingList.create({userId : userId, blogId: blogId});
    res.status(201).json(newItem);
});

module.exports = listRouter;