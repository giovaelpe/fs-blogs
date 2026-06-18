const {Model, DataTypes} = require('sequelize');
const {sequelize} = require('../util/db.js');

class User extends Model {};

User.init({
    id :{
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    name : {
        allowNull: false,
        type: DataTypes.STRING
    },
    username: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
{
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'users',
});

module.exports = User;