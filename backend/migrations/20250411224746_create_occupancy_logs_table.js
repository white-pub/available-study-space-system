/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('occupancy_logs', function (table) {
    table.increments('log_id').primary(); // Auto-incrementing primary key
    table.integer('room_id').unsigned().notNullable(); // Foreign key to rooms table
    table.datetime('occupancy_start').notNullable(); // Start time, cannot be null
    table.datetime('occupancy_end').nullable(); // End time, can be null

    // Define foreign key relationship
    table.foreign('room_id').references('room_id').inTable('rooms');

    table.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp of creation
    table.timestamp('updated_at').defaultTo(knex.fn.now()); // Timestamp of last update
  });
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable('occupancy_logs');
};
