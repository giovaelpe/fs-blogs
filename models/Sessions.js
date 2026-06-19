const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Sessions extends Model { };

Sessions.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
{
    sequelize,
    underscored: true,
    modelName: "sessions"
});

module.exports = Sessions;