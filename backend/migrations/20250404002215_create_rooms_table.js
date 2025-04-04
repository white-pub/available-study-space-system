/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('rooms', function(table) {
      table.increments('room_id').primary(); // Auto-incrementing primary key
      table.string('room_name').nullable(); // Room name (can be null)
      table.integer('capacity').notNullable(); // Room capacity (max number of people in a room)
      table.integer('distance').notNullable(); // Distance (how many minute it takes to walk from Jtop to a room)
      table.integer('whiteboard').notNullable(); // number of whiteboards
      table.integer('tv').notNullable(); // number of tv
      table.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp of creation
      table.timestamp('updated_at').defaultTo(knex.fn.now()); // Timestamp of last update
    });
};
  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('rooms');
};
  
