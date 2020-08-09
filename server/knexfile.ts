require('dotenv').config();

module.exports = {

    development: {
        client: 'sqlite3',
        connection: {
            filename: `${__dirname}/src/database/database.sqlite`
        },
        migrations: {
            directory: `${__dirname}/src/database/migrations`
        },
        useNullAsDefault: true,
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            tableName: `${__dirname}/dist/src/database/migrations`
        }
    }
};