//require('dotenv').config();

module.exports = {
    DATABASE_URL : process.env.DATABASE_URL,
    TEST_DATABASE_URL : process.env.TEST_DATABASE_URL,
    PORT : process.env.PORT || 3001,
    BCRYPT_SALT: process.env.BCRYPT_SALT,
    SECRET: process.env.SECRET
}