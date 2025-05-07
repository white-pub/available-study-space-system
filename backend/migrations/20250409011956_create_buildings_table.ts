// Migration: Create Buildings Table
// Updated: 2025-04-09
// 
// Creates the "buildings" table, which stores information
// about buildings, including their ID and name.

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('buildings', function (table) {
    table.increments('building_id').primary(); // Auto-incrementing primary key
    table.string('building_name').notNullable(); // Building name, cannot be null
    table.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp of creation
    table.timestamp('updated_at').defaultTo(knex.fn.now()); // Timestamp of last update
  });
};




/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('buildings');
};
