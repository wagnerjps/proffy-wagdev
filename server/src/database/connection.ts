require('dotenv').config();
import knex from 'knex'

const configuration = require("../../knexfile");

const env = process.env.NODE_ENV;

const config = (env === 'production') ? configuration.production : configuration.development;

const db = knex(config);

export default db;