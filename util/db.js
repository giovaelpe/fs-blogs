const {Sequelize} = require('sequelize');
const {DATABASE_URL} = require('../util/config');

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres'
});

const connectToDb = async() => {
    try {
        await sequelize.authenticate();
        console.log("Connected to database");
    } catch(error) {
        console.log('Connection to database failed');
        return process.exit(1);
    }
    return null
}

module.exports = {
    sequelize,
    connectToDb
};
