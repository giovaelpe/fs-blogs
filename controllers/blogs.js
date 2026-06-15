const express = require('express');
const blogRouter = express.Router();
const Blog = require('../models/Blog');

blogRouter.get("/", async(req, res) => {
    const blogs = await Blog.findAll();
    res.json(blogs);
})

blogRouter.post("/", async (req, res) => {

    try {
        const blog = await Blog.create({...req.body});
        return res.json(blog);
    } catch(error){
        console.log(error);
        return res.status(400).json({error})
    }
})

blogRouter.delete("/:id", async (req, res) => {
    const blog = await Blog.findByPk(req.params.id);
    if(!blog){
        return res.status(404).json({error: "Not found"});
    }
    await blog.destroy();
    return res.json(blog);
});

module.exports = blogRouter;