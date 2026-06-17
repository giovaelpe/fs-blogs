const {DataTypes} = require('sequelize');

module.exports = {
    up: async({context: queryInterface}) => {
        await queryInterface.addColumn('reading_list', 'unread', {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        })
    },
    down : async({context: queryInterface}) => {
        await queryInterface.removeColumn('reading_list', 'unread');
    }
}