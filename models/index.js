const Blog = require('./Blog');
const User = require('./User');
const {sequelize} = require('../util/db');

User.hasMany(Blog);
Blog.belongsTo(User);

//Blog.sync({alter: true});
//User.sync({alter: true});
sequelize.sync({alter: true});

module.exports = {
    Blog,
    User
}