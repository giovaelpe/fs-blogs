const express = require('express');
const app = express();
const blogRouter = require('./controllers/blogs.js')
const { userRouter } = require('./controllers/users.js');
const listRouter = require('./controllers/readingList.js');
const { DATABASE_URL, PORT, TEST_DATABASE_URL, SECRET } = require('./util/config.js');
const User = require('./models/User.js');
const Blog = require('./models/Blog.js');
const { connectToDb} = require('./util/db.js');
const {runMigrations} = require('./util/db.js');
const {sequelize} = require('./util/db.js');

app.use(express.json());





app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/readinglists", listRouter);

app.get("/", (req, res) => {
    res.sendStatus(200);
});

app.post("/api/reset", async(req, res) => {
    try {
        await sequelize.query("DROP SCHEMA public CASCADE;");
        await sequelize.query("CREATE SCHEMA public;");
        
        await runMigrations();
        
        res.sendStatus(201);

    } catch(error) {
        console.log(error.message);
        res.status(500).json({error: "error deleting everything"});
    }
})

const puerto = PORT || 3001;

const start = async () => {
    await connectToDb()
    app.listen(puerto, () => {
        console.log("Server running in port 3001");
    })
}

start();

module.exports = app;
