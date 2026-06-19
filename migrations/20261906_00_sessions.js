const {DataTypes} = require('sequelize');
const { down } = require('./20261706_00_initialize_blogs_and_users');

module.exports = {
    up : async({context: queryInterface}) => {
        await queryInterface.createTable('sessions', {
            id : {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            token : {
                type: DataTypes.TEXT,
                allowNull: false
            },
            enabled : {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        })
    },
    down : async({context: queryInterface}) => {
        await queryInterface.dropTable('sessions');
    }
}