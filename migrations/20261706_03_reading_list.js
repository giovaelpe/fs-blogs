const {DataTypes} = require('sequelize');

module.exports = {
    up: async({context: queryInterface}) => {
        await queryInterface.createTable('reading_list', {
            id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true
            },
            blog_id : {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'blogs',
                    key: 'id'
                }
            },
            user_id: {
                type : DataTypes.INTEGER,
                allowNull: false,
                references : {
                    model: 'users',
                    key: 'id'
                }
            },
            created_at : {
                type: DataTypes.DATE
            },
            updated_at : {
                type: DataTypes.DATE
            }
        })
    },
    down : async({context: queryInterface}) => {
        await queryInterface.dropTable('reading_list');
    }
}