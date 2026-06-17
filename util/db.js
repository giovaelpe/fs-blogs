const {Sequelize} = require('sequelize');
const {DATABASE_URL, TEST_DATABASE_URL} = require('../util/config');
const {Umzug, SequelizeStorage} = require('umzug');

const isTesting = process.env.TESTING? true : false;

const dbUrl = isTesting? TEST_DATABASE_URL : DATABASE_URL;

const sequelize = new Sequelize(dbUrl, {
    dialect: 'postgres'
});

const runMigrations = async() => {
    const migrator = new Umzug({
        migrations: {
            glob: 'migrations/*js'
        },
        storage: new SequelizeStorage({sequelize, tableName: 'migrations'}),
        context: sequelize.getQueryInterface(),
        logger: console,
    });

    const migrations = await migrator.up();
    console.log('Migrations up to date', {
        files: migrations.map((mig) => mig.name)
    });
}



const connectToDb = async() => {
    try {
        await sequelize.authenticate();
        await runMigrations();
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
