
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

export async function seed(knex): Promise<void> {
  // Clear existing data: Delete child table first to avoid foreign key constraints
  await knex('occupancy_logs').del();
  await knex('building_hours').del();
  await knex('buildings_rooms').del();
  await knex('rooms').del();
  await knex('buildings').del();

  // Mock data
  const buildings = [
    {
      building_name: 'Dunklau',
      rooms: [
        { room_name: '001', capacity: 2, distance: 5, whiteboard: 1, tv: 1 },
        { room_name: '105', capacity: 3, distance: 6, whiteboard: 0, tv: 1 },
        { room_name: '107', capacity: 4, distance: 7, whiteboard: 1, tv: 1 },
        { room_name: '202', capacity: 5, distance: 7, whiteboard: 0, tv: 1 },
        { room_name: '205', capacity: 6, distance: 8, whiteboard: 0, tv: 1 },
        { room_name: '207', capacity: 4, distance: 8, whiteboard: 0, tv: 1 },
      ],
    },
    {
      building_name: 'Link Library',
      rooms: [
        { room_name: '005', capacity: 4, distance: 6, whiteboard: 1, tv: 1 },
        { room_name: '007', capacity: 4, distance: 6, whiteboard: 1, tv: 1 },
        { room_name: '203', capacity: 3, distance: 7, whiteboard: 1, tv: 1 },
        { room_name: '212', capacity: 15, distance: 8, whiteboard: 1, tv: 0 },
        { room_name: '213', capacity: 5, distance: 8, whiteboard: 1, tv: 1 },
        { room_name: '220', capacity: 6, distance: 9, whiteboard: 0, tv: 1 },
      ],
    },
    {
      building_name: 'Janzow',
      rooms: [
        { room_name: '014', capacity: 5, distance: 1, whiteboard: 1, tv: 0 },
      ],
    },
  ];

  // Insert buildings and their rooms
  for (const building of buildings) {
    // Insert building and retrieve building_id
    await knex('buildings').insert({ building_name: building.building_name });
    const { building_id } = await knex('buildings')
      .select('building_id')
      .where('building_name', building.building_name)
      .first();

    // Insert rooms one by one and map them to the building
    for (const room of building.rooms) {
      // Insert room and retrieve room_id
      await knex('rooms').insert(room);
      const { room_id } = await knex('rooms')
        .select('room_id')
        .where('room_name', room.room_name)
        .first();

      // Insert mapping into buildings_rooms
      await knex('buildings_rooms').insert({
        building_id,
        room_id,
      });
    }
  }


  // Handle building_hours

  // Mock data
  const hoursData = [
    {
      building_name: 'Dunklau',
      hours: [
        { day_of_week: 'Monday', open_at: '07:00:00', close_at: '22:00:00' },
        { day_of_week: 'Tuesday', open_at: '07:00:00', close_at: '22:00:00' },
        { day_of_week: 'Wednesday', open_at: '07:00:00', close_at: '22:00:00' },
        { day_of_week: 'Thursday', open_at: '07:00:00', close_at: '22:00:00' },
        { day_of_week: 'Friday', open_at: '07:00:00', close_at: '17:00:00' },
        { day_of_week: 'Saturday', open_at: '12:00:00', close_at: '17:00:00' },
        { day_of_week: 'Sunday', open_at: '12:00:00', close_at: '22:00:00' },
      ],
    },
    {
      building_name: 'Link Library',
      hours: [
        { day_of_week: 'Monday', open_at: '07:45:00', close_at: '23:59:59' },
        { day_of_week: 'Tuesday', open_at: '07:45:00', close_at: '23:59:59' },
        { day_of_week: 'Wednesday', open_at: '07:45:00', close_at: '23:59:59' },
        { day_of_week: 'Thursday', open_at: '07:45:00', close_at: '23:59:59' },
        { day_of_week: 'Friday', open_at: '07:45:00', close_at: '17:00:00' },
        { day_of_week: 'Saturday', open_at: '13:00:00', close_at: '17:00:00' },
        { day_of_week: 'Sunday', open_at: '14:00:00', close_at: '23:59:59' },
      ],
    },
    {
      building_name: 'Janzow',
      hours: [
        { day_of_week: 'Monday', open_at: '00:00:00', close_at: '23:59:59' },
        { day_of_week: 'Tuesday', open_at: '00:00:00', close_at: '23:59:59' },
        { day_of_week: 'Wednesday', open_at: '00:00:00', close_at: '23:59:59' },
        { day_of_week: 'Thursday', open_at: '00:00:00', close_at: '23:59:59' },
        { day_of_week: 'Friday', open_at: '00:00:00', close_at: '23:59:59' },
        { day_of_week: 'Saturday', open_at: '00:00:00', close_at: '23:59:59' },
        { day_of_week: 'Sunday', open_at: '00:00:00', close_at: '23:59:59' },
      ],
    },
  ];
  
  // Insert data
  for (const building of hoursData) {
    // Retrieve building_id based on building_name
    const { building_id } = await knex('buildings')
      .select('building_id')
      .where('building_name', building.building_name)
      .first();

    // Insert hours for each day of the week
    for (const hour of building.hours) {
      await knex('building_hours').insert({
        building_id,
        day_of_week: hour.day_of_week,
        open_at: hour.open_at,
        close_at: hour.close_at,
      });
    }
  }

  // handle occupancy_logs mock data
  
  // Mock data for occupancy logs
  const occupancyLogs = [
    {
      building_name: 'Dunklau',
      room_name: '105',
      occupancy_start: '2025-03-25 08:12:30',
      occupancy_end: '2025-03-25 08:12:45',
    },
    {
      building_name: 'Dunklau',
      room_name: '001',
      occupancy_start: '2025-03-28 08:10:31',
      occupancy_end: '2025-03-28 10:10:32',
    },
    {
      building_name: 'Dunklau',
      room_name: '205',
      occupancy_start: '2025-03-30 08:30:32',
      occupancy_end: '2025-03-30 08:50:33',
    },
    {
      building_name: 'Link Library',
      room_name: '220',
      occupancy_start: '2025-04-02 08:12:33',
      occupancy_end: '2025-04-02 12:12:33',
    },
    {
      building_name: 'Link Library',
      room_name: '005',
      occupancy_start: '2025-04-02 08:12:34',
      occupancy_end: '2025-04-02 16:12:34',
    },
    {
      building_name: 'Dunklau',
      room_name: '105',
      occupancy_start: '2025-04-03 08:50:35',
      occupancy_end: '2025-04-03 09:50:36',
    },
    {
      building_name: 'Janzow',
      room_name: '014',
      occupancy_start: '2025-04-03 10:58:36',
      occupancy_end: '2025-04-03 15:58:37',
    },
    {
      building_name: 'Link Library',
      room_name: '007',
      occupancy_start: '2025-04-04 07:15:37',
      occupancy_end: null,
    },
    {
      building_name: 'Dunklau',
      room_name: '205',
      occupancy_start: '2025-04-04 09:15:37',
      occupancy_end: null,
    },
  ];

  // Join tables to map room_id with building_name and room_name
  const roomMappings = await knex('rooms')
    .join('buildings_rooms', 'rooms.room_id', 'buildings_rooms.room_id')
    .join('buildings', 'buildings_rooms.building_id', 'buildings.building_id')
    .select(
      'rooms.room_id',
      'rooms.room_name',
      'buildings.building_name'
    );

  // Create a map for fast lookup of room_id
  const roomIdMap: Record<string, number> = {};
  roomMappings.forEach(({ room_id, room_name, building_name }) => {
    roomIdMap[`${building_name}_${room_name}`] = room_id; // Use a unique key combining building_name and room_name
  });

  // Insert occupancy logs with room data
  for (const log of occupancyLogs) {
    const room_id = roomIdMap[`${log.building_name}_${log.room_name}`]; // Retrieve room_id using building_name and room_name

    if (room_id) {
      await knex('occupancy_logs').insert({
        room_id,
        occupancy_start: log.occupancy_start,
        occupancy_end: log.occupancy_end,
      });
    } else {
      console.error(`Room ID not found for ${log.building_name} - ${log.room_name}`);
    }
  }


};