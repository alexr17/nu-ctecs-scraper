// Update with your config settings.
require('dotenv').config();
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: process.env.DEV_DB_HOST,
      user: process.env.DEV_DB_USER,
      password: process.env.DEV_DB_PASSWORD,
      database: process.env.DEV_DB_DATABASE
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations',
    },
    pool: {
      min: 2,
      max: 50,
    }
  }

};
