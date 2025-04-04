const knex = require('knex');
const config = require('./knexfile');

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