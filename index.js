const express = require('express');
const app = express();
const blogRouter = require('./controllers/blogs.js')
const {DATABASE_URL, PORT} = require('./util/config.js');
app.use(express.json());



app.use("/api/blogs", blogRouter);

app.listen(PORT, () => {
    console.log("Server running in port 3011");
})

