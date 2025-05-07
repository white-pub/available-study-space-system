// Migration: Create Building Hours Table
// Updated: 2025-04-14
// 
// Creates the "building_hours" table, which stores
// information about the opening and closing hours of buildings for each day of the week.
// It includes a foreign key relationship to the `buildings` table (the building_id)

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('building_hours', function (table) {
    table.increments('building_hour_id').primary(); // Auto-incrementing primary key
    table.integer('building_id').unsigned().notNullable(); // Foreign key to buildings table
    table.string('day_of_week').notNullable(); // Day of the week (e.g., Monday, Tuesday)
    table.time('open_at').notNullable(); // Opening time
    table.time('close_at').notNullable(); // Closing time

    // Define foreign key relationship
    table.foreign('building_id').references('building_id').inTable('buildings');

    table.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp of creation
    table.timestamp('updated_at').defaultTo(knex.fn.now()); // Timestamp of last update
  });
};



/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('building_hours');
};