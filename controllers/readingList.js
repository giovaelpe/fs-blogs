const express = require('express');
const listRouter = express.Router();
const User = require('../models/User');
const Blog = require('../models/Blog');
const ReadingList = require('../models/ReadingList');


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