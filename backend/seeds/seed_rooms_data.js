/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  try {
    // Deletes ALL existing entries in the 'rooms' table
    await knex('rooms').del();

    // Inserts new entries into the 'rooms' table
    await knex('rooms').insert([
      { room_name: '001', capacity: 2, distance: 5, whiteboard: 1, tv: 1 },
      { room_name: '105', capacity: 3, distance: 6, whiteboard: 0, tv: 1 },
      { room_name: '107', capacity: 4, distance: 7, whiteboard: 1, tv: 1 },
      { room_name: '202', capacity: 5, distance: 7, whiteboard: 0, tv: 1 },
      { room_name: '205', capacity: 6, distance: 8, whiteboard: 0, tv: 1 },
      { room_name: '207', capacity: 4, distance: 8, whiteboard: 0, tv: 1 },
      { room_name: '005', capacity: 4, distance: 6, whiteboard: 1, tv: 1 },
      { room_name: '007', capacity: 4, distance: 6, whiteboard: 1, tv: 1 },
      { room_name: '203', capacity: 3, distance: 7, whiteboard: 1, tv: 1 },
      { room_name: '212', capacity: 15, distance: 8, whiteboard: 1, tv: 0 },
      { room_name: '213', capacity: 5, distance: 8, whiteboard: 1, tv: 1 },
      { room_name: '220', capacity: 6, distance: 9, whiteboard: 0, tv: 1 },
      { room_name: '014', capacity: 5, distance: 1, whiteboard: 1, tv: 0 },
    ]);
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};