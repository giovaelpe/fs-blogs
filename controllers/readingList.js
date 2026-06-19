const express = require('express');
const listRouter = express.Router();
const User = require('../models/User');
const Blog = require('../models/Blog');
const ReadingList = require('../models/ReadingList');
const {tokenExtractor, checkSessionToken} = require('./middlewares');


listRouter.get('/', async(req, res) => {
    const readingList = await ReadingList.findAll();
    res.json(readingList);
})

listRouter.put('/:id', tokenExtractor, async(req, res) => {
    const listItem = await ReadingList.findByPk(req.params.id);
    if(!listItem) {
        return res.status(404).json({error: "item not found"});
    }
    if(listItem.userId !== req.decodedToken.id){
        return res.status(401).json({error: "not authorized"});
    }
    listItem.read = req.body.read;
    await listItem.save();
    res.status(201).json(listItem);
})


listRouter.post('/', tokenExtractor, checkSessionToken, async(req, res) => {
    const {blogId} = req.body;
    const {userId} = req.body
    if(!blogId || !userId) {
        return res.status(400).json({error: "blogId missing"});
    }
    const user = await User.findByPk(userId);
    const blog = await Blog.findByPk(blogId);
    const checkBlog = await ReadingList.findOne({
        where: {
            blogId : blogId,
            userId: userId
        }
    });
    if(checkBlog){
        return res.status(400).json({error: "already in the list"})
    }
    if(!user || !blog) {
        return res.status(404).json({error: "Not found"});
    }

    const newItem = await ReadingList.create({userId : userId, blogId: blogId});
    const formatedJson = newItem.toJSON();
    formatedJson.user_id = formatedJson.userId;
    formatedJson.blog_id = formatedJson.blogId;
    delete formatedJson.blogId;
    delete formatedJson.userId;
    res.status(200).json(formatedJson);
});

module.exports = listRouter;