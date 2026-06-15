require('dotenv').config();
const express = require('express');
const app = express();
const {Sequelize} = require('sequelize');
const {main, Blog} = require('./cli.js');
main();

app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});

app.get("/api/blogs", async(req, res) => {
    const blogs = await Blog.findAll();
    res.json(blogs);
})

app.post("/api/blogs", async (req, res) => {

    try {
        const blog = await Blog.create({...req.body});
        return res.json(blog);
    } catch(error){
        console.log(error);
        return res.status(400).json({error})
    }
})

app.delete("/api/blogs/:id", async (req, res) => {
    const blog = await Blog.findByPk(req.params.id);
    if(!blog){
        return res.status(404).json({error: "Not found"});
    }
    await blog.destroy();
    return res.json(blog);
})

app.listen(3001, () => {
    console.log("Server running in port 3011");
})

