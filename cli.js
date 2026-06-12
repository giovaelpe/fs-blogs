require('dotenv').config();
const {Sequelize, Model, DataTypes, QueryTypes} = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
})

class Blog extends Model {};

Blog.init({
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.TEXT
    },
    url :{
        type: DataTypes.TEXT,
        allowNull: false
    },
    title : {
        type: DataTypes.TEXT,
        allowNull: false
    },
    likes : {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    timestamps: false,
    modelName: 'blogs'
});

const main = async () => {
    try {
        await sequelize.authenticate();
        const blogs = await sequelize.query("SELECT * FROM blogs", {type: QueryTypes.SELECT});
        blogs.forEach(blog => {
            console.log(blog.author+" : "+blog.title+", "+blog.likes+" likes");
        })
    } catch(error) {
        console.log(error);
    }
}
main();