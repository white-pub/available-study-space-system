// Update knex config settings.

// import 'dotenv/config'; // Load environment variables from .env file
import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

// require('dotenv').config({ path: '../.env' });

/**
 * @type{import('knex').Knex.Config)}
 */
const config = {
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1', // localhost
      port: 3306,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    },
    migrations: {
      directory: './migrations',
      extension: 'ts', // Use TypeScript for migrations
    },
    seeds: {
      directory: './seeds',
      extension: 'ts', // Use TypeScript for seeds
    },
  },
};

export default config;
