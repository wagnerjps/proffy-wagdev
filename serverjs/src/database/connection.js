require('dotenv').config();
const knex = require("knex");
const configuration = require("../../knexfile");

const env = process.env.NODE_ENV;

const config = (env === 'production') ? configuration.production : configuration.development;

const connection = knex(config);

module.exports = connection;


