// Migration: Create Occupancy Logs Table
// Updated: 2025-04-11
// 
// Creates the "occupancy_logs" table, storing information about 
// room_id and occupancy periods, including start and end times. 
// Includes foreign key relationship to the `rooms` table (room_id)

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
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
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('occupancy_logs');
};
