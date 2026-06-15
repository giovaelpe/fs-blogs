const express = require('express');
const blogRouter = express.Router();
const {Blog} = require('../models/index');

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




blogRouter.get("/", async (req, res) => {
    const blogs = await Blog.findAll();
    res.json(blogs);
})



blogRouter.get('/:id', blogFinder, async (req, res) => {
    res.json(req.blog);
})

blogRouter.post("/", async (req, res, next) => {

    try {
        const blog = await Blog.create({ ...req.body });
        return res.json(blog);
    } catch (error) {
        next(error);
    }
})

blogRouter.delete("/:id", blogFinder, async (req, res) => {
    await req.blog.destroy();
    return res.status(204).json(blog);
});

blogRouter.put('/:id', blogFinder, async (req, res, next) => {
    try {
        req.blog.likes = req.body.likes;
        await req.blog.save();
        return res.json(req.blog);
    } catch(error) {
        next(error);
    }
})

blogRouter.use(errorHandler);

module.exports = blogRouter;