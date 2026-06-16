const {Sequelize} = require('sequelize');
const {DATABASE_URL, TEST_DATABASE_URL} = require('../util/config');

const isTesting = process.env.TESTING === true;

const dbUrl = isTesting? TEST_DATABASE_URL : DATABASE_URL;

const sequelize = new Sequelize(dbUrl, {
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
