module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'proffy_db',
      user:     'postgres',
      password: 'waki103719'
    },
    migrations: {
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: `${__dirname}/src/database/migrations`
    }
  }

};
