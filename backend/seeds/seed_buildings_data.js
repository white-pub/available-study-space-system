/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Delete existing data in the table
  await knex('buildings').del();

  // Insert new seed data
  await knex('buildings').insert([
    { building_name: 'Dunklau' },
    { building_name: 'Link Library' },
    { building_name: 'Jansow' },
  ]);
};
