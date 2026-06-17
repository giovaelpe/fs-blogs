const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../util/db');

class ReadingList extends Model { };

ReadingList.init({
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoincrement: true
    },
    blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'blogs',
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    unread : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},
    {
        sequelize,
        tableName: "reading_list",
        timestamps: true,
        underscored: true,
        modelName: 'reading_list'
    }
);

module.exports = ReadingList;
