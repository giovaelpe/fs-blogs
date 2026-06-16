const express = require('express');
const app = express();
const blogRouter = require('./controllers/blogs.js')
const {userRouter} = require('./controllers/users.js');
const {DATABASE_URL, PORT, TEST_DATABASE_URL} = require('./util/config.js');
const User = require('./models/User.js');
const Blog = require('./models/Blog.js');

app.use(express.json());



app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
    res.status(200).send('ok');
});

app.post("/deleteall", (req, res) => {
    Blog.destroy();
    User.destroy();
    res.status(204).end();
})

const puerto = PORT || 3001;

app.listen(puerto, () => {
    console.log("Server running in port 3011");
})

