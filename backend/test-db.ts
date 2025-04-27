// const knex = require('knex');
// // const config = require('./knexfile');
// const config = require('ts-node').register() && require('./knexfile').default;

import knex from 'knex';
import config from './knexfile';

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