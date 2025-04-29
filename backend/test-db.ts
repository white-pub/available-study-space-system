// test-db.ts
// Test the database connection and if env is successful loaded in knexfile.

import knex from 'knex';
import config from './knexfile';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: '../.env' });

// Debug: Log environment variables
console.log('Environment Variables:');
console.log({
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_PORT: process.env.MYSQL_PORT,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_DATABASE: process.env.MYSQL_DATABASE,
});

const db = knex(config.development);

db.raw('SELECT 1')
  .then(() => {
    console.log('Database connection successful');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });