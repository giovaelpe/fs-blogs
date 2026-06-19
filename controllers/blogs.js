const express = require('express');
const blogRouter = express.Router();
const { Blog } = require('../models/index');
const { User } = require('../models/index');
const { tokenExtractor, userFinder } = require('./users');
const { Op, Sequelize } = require('sequelize');
const Sessions = require('../models/Sessions');
const {checkSessionToken, blogFinder, errorHandler} = require('./middlewares');




blogRouter.get("/", async (req, res) => {
    let where = {};
    if (req.query.search) {
        where = {
            [Op.or]: [
                {
                    title: { [Op.iLike]: `%${req.query.search}%` }
                },
                {
                    author: { [Op.iLike]: `%${req.query.search}%` }
                }
            ]
        }
    }
    const blogs = await Blog.findAll({
        attributes: {
            exclude: ['userId']
        },
        include: {
            model: User,
            attributes: ['name']
        },
        order: [
            ['likes', 'DESC']
        ],
        where
    });
    res.status(200).json(blogs);
})

blogRouter.get('/authors', async (req, res) => {
    const blogs = await Blog.findAll({
        attributes: [
            'author', [Sequelize.literal('CAST(COUNT(id) AS INTEGER)'), 'blogs'],
            [Sequelize.literal('CAST(SUM(likes) AS INTEGER)'), 'likes']
        ],
        group: ['author'],
    });
    res.json(blogs);
})



blogRouter.get('/:id', blogFinder, async (req, res) => {
    res.json(req.blog);
})

blogRouter.post("/", tokenExtractor, checkSessionToken, async (req, res, next) => {
    const user = await User.findOne({
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


    try {
        const blog = await Blog.create({ ...req.body, userId: req.decodedToken.id });
        return res.json(blog);
    } catch (error) {
        next(error);
    }
})

blogRouter.delete("/:id", blogFinder, tokenExtractor, userFinder, async (req, res) => {
    if (req.decodedToken.id != req.blog.userId) {
        return res.status(401).json({ error: "Not allowed" })
    }
    await req.blog.destroy();
    return res.status(204).end();
});

blogRouter.put('/:id', blogFinder, async (req, res, next) => {
    if (!req.body.likes) {
        return res.status(400).json({ error: "likes required" });
    }
    try {
        req.blog.likes = req.body.likes;
        await req.blog.save();
        return res.json(req.blog);
    } catch (error) {
        next(error);
    }
})

blogRouter.use(errorHandler);

module.exports = blogRouter;