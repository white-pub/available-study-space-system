// Migration: Create Buildings-Rooms Table
// Updated: 2025-04-11
// 
// Creates the "buildings_rooms" table, which establishes
// a one-to-many relationship between buildings and rooms. (one building have many room)
// Has foreign key relationships to the buildings and rooms tables through building_id and room_id,
// has cascading deletes.



/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('buildings_rooms', function (table) {
        table.increments('building_room_id').primary(); // Auto-incrementing primary key
        table.integer('building_id').unsigned().notNullable(); // Foreign key to buildings
        table.integer('room_id').unsigned().notNullable(); // Foreign key to rooms

        // Define foreign key relationships
        table.foreign('building_id').references('building_id').inTable('buildings').onDelete('CASCADE');
        table.foreign('room_id').references('room_id').inTable('rooms').onDelete('CASCADE');

        table.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp of creation
        table.timestamp('updated_at').defaultTo(knex.fn.now()); // Timestamp of last update
    });
};



/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('buildings_rooms');
};
