const express = require('express');
const app = express();
const blogRouter = require('./controllers/blogs.js')
const { userRouter } = require('./controllers/users.js');
const listRouter = require('./controllers/readingList.js');
const { DATABASE_URL, PORT, TEST_DATABASE_URL, SECRET } = require('./util/config.js');
const User = require('./models/User.js');
const Blog = require('./models/Blog.js');
const { connectToDb, sequelize } = require('./util/db.js');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const myStore = new SequelizeStore({db: sequelize, expiration: 24 * 60 *60 *1000})


app.use(express.json());

app.use(
    session({
        secret: SECRET,
        store: myStore,
        resave: false
    })
);

myStore.sync();



app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/readinglist", listRouter);

app.get("/", (req, res) => {
    res.sendStatus(200);
});

app.post("/api/reset", (req, res) => {
    Blog.destroy({ where: {} });
    User.destroy({ where: {} });
    res.status(204).end();
})

const puerto = PORT || 3001;

const start = async () => {
    await connectToDb()
    app.listen(puerto, () => {
        console.log("Server running in port 3001");
    })
}

start();

