// backend/knexfile.ts
// Updated: 2025-05-06
// 
// Knex is used to manage migration and as query builder to the MySQL database
// This is the knex config settings.

import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */


/**
 * @type{import('knex').Knex.Config)}
 */
const config = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.MYSQL_HOST, // localhost
      port: Number(process.env.MYSQL_PORT),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    },
    // debug: true,
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
