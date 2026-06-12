require('dotenv').config();
const express = require('express');
const app = express();
const {Sequelize} = require('sequelize');

app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});

