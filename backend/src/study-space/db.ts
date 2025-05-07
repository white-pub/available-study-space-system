/*
db.ts
Description: This file holds the types for each database table and the functions needed for backend CRUD.
Written by: Abe Gomez and Anna Chen

*/

import { Knex } from "knex";

// Define a study space
type StudySpace = {
    room_id: number;
    room_name: string;
    capacity: number;
    distance: number;
    whiteboard: number;
    tv: number;
    room_pic_url: string;
    building_map_url: string;
    campus_map_url: string;
    created_at: Date;
    updated_at: Date;
};

// Define a building
type Building = {
    building_id: number;
    building_name: string;
    created_at: Date;
    updated_at: Date;
}

// Define a building room relation
type BuildingRoom = {
    building_room_id: number;
    building_id: Building["building_id"];
    room_id: StudySpace["room_id"];
    created_at: Date;
    updated_at: Date;
}

// Define occupied space log
type OccupiedSpaceLog = {
    log_id: number;
    room_id: StudySpace["room_id"];
    occupancy_start: Date;
    occupancy_end: Date;
    created_at: Date;
    updated_at: Date;
}

// Define building hours
type BuildingHours = {
    building_hour_id: number;
    building_id: Building["building_id"];
    day_of_the_week: string;
    open_at: Date;
    close_at: Date;
}


// Fetch a study space by its id.
// null required because the id either exists or does not.
export async function getStudySpaceById(db: Knex, id: number): Promise<StudySpace | null> {
    const result = await db
        .select("*")
        .from("rooms")
        .where("room_id", "=", id)
        .first(); // Should return the first id that matches when fetching.
    return result as StudySpace | null;

}

// Fetch all study spaces for listing.
export async function getAllStudySpaces(db: Knex): Promise<StudySpace[]> {
    const result = await db
        .select("*")
        .from("rooms")

    return result as StudySpace[];
}

// Fetch a building by its id.
// null required because the id either exists or does not.
export async function getBuildingById(db: Knex, id: number): Promise<Building | null> {
    const result = await db
        .select("*")
        .from("buildings")
        .where("building_id", "=", id)
        .first(); // Should return the first id that matches when fetching.
    return result as Building | null;

}

// Fetch all buildings for listing.
export async function getAllBuildings(db: Knex): Promise<Building[]> {
    const result = await db
        .select("*")
        .from("buildings")

    return result as Building[];
}

// Fetch a building room by its id.
// null required because the id either exists or does not.
export async function getBuildingRoomById(db: Knex, id: number): Promise<BuildingRoom | null> {
    const result = await db
        .select("*")
        .from("buildings_rooms")
        .where("building_room_id", "=", id)
        .first(); // Should return the first id that matches when fetching.
    return result as BuildingRoom | null;

}

// Fetch all buildings for listing.
export async function getAllBuildingRooms(db: Knex): Promise<BuildingRoom[]> {
    const result = await db
        .select("*")
        .from("buildings_rooms")

    return result as BuildingRoom[];
}

// Fetch an occupied space log by its id.
// null required because the id either exists or does not.
export async function getOccupiedSpaceLogById(db: Knex, id: number): Promise<OccupiedSpaceLog | null> {
    const result = await db
        .select("*")
        .from("occupancy_logs")
        .where("log_id", "=", id)
        .first(); // Should return the first id that matches when fetching.
    return result as OccupiedSpaceLog | null;

}

// Fetch all occupied space logs for listing.
export async function getAllOccupancyLog(db: Knex): Promise<OccupiedSpaceLog[]> {
    const result = await db
        .select("*")
        .from("occupancy_logs")

    return result as OccupiedSpaceLog[];
}

// Create an occupied space log via ThunderClient Request.
export async function createOccupiedSpaceLog(db: Knex, data: {
    room_id: number;
    occupancy_start: Date;
    occupancy_end?: Date | null;
}): Promise<OccupiedSpaceLog | null> {
    try {
        // Insert data using Knex's query builder
        const [insertId] = await db("occupancy_logs")
            .insert({
                room_id: data.room_id,
                occupancy_start: data.occupancy_start.toISOString().replace('Z', '').replace('T', ' '), // Ensure proper format
                occupancy_end: data.occupancy_end ? data.occupancy_end.toISOString().replace('Z', '').replace('T', ' ') : null,
                created_at: db.fn.now(),
                updated_at: db.fn.now(),
            })
            .returning("log_id"); // Ensure returning inserted ID

        // Fetch the inserted row
        const insertedRow = await db("occupancy_logs")
            .where("log_id", insertId)
            .first();

        return insertedRow as OccupiedSpaceLog | null;
    } catch (error) {
        console.error("Database insertion failed:", error);
        return null;
    }
}

// Update an occupied space log, only occupancy_end time, via ThunderClient Request.
export async function updateOccupiedSpaceLog(db: Knex, id: number, data: {
    occupancy_end?: Date | null;
}): Promise<OccupiedSpaceLog | null> {
    try {
        const updatedRows = await db("occupancy_logs")
            .where("log_id", id) // Ensure the correct row is being updated
            .update({
                occupancy_end: data.occupancy_end ? data.occupancy_end.toISOString().replace('Z', '').replace('T', ' ') : null,
                updated_at: db.fn.now(),
            });

        return updatedRows ? await db("occupancy_logs").where("log_id", id).first() : null;


    } catch (error) {
        console.error("Database update failed:", error);
        return null;
    }
}

// Delete an occupied space log via ThunderClient Request.
export async function deleteOccupiedSpaceLog(db: Knex, id: number) {
    try {
        const deletedOccupied = await db("occupancy_logs")
            .select("*")
            .where("log_id", "=", id)
            .first()
            .del();

        return deletedOccupied ? { success: true, message: "Occupied space log deleted successfully" } : { success: false, error: "Occupied space log not found" };
    } catch (error) {
        return { success: false, error: "Failed to delete occupied space log" };
    }
}


// Fetch a buildings hours by its id.
// null required because the id either exists or does not.
export async function getBuildingHourById(db: Knex, id: number): Promise<BuildingHours | null> {
    const result = await db
        .select("*")
        .from("building_hours")
        .where("building_hour_id", "=", id)
        .first(); // Should return the first id that matches when fetching.
    return result as BuildingHours | null;

}

// Fetch all building hours for listing.
export async function getAllBuildingHours(db: Knex): Promise<BuildingHours[]> {
    const result = await db
        .select("*")
        .from("building_hours")

    return result as BuildingHours[];
}

// Create one joined table with all the information about a room:
// room_id, room_name, ..., building_id, building_name, building_hours (for today)
export async function getAllRoomsWithBuildingInfo(db: Knex): Promise<any[]> {
    
    // Get today's day name (e.g., "Monday")
    const today = new Date().toLocaleString("en-US", { weekday: "long" }); 

    const roomsWithBuildingInfo = await db
        .select(
            "rooms.room_id",
            "rooms.room_name",
            "rooms.capacity",
            "rooms.distance",
            "rooms.whiteboard",
            "rooms.tv",
            "rooms.room_pic_url",
            "rooms.building_map_url",
            "rooms.campus_map_url",
            "buildings.building_id",
            "buildings.building_name",
            "building_hours.day_of_week",
            "building_hours.open_at",
            "building_hours.close_at"
        )
        .from("rooms") // rooms is the core table
        .join("buildings_rooms", "rooms.room_id", "buildings_rooms.room_id") // maps rooms to buildings
        .join("buildings", "buildings_rooms.building_id", "buildings.building_id")
        .join("building_hours", "buildings.building_id", "building_hours.building_id")
        .where("building_hours.day_of_week", today); // Only include today's building hours

    return roomsWithBuildingInfo;
}

// get all room_id for currently occupied rooms
export async function getOccupiedRooms(db: Knex): Promise<any[]> {
    const occupiedRooms = await db
        .select(
            "occupancy_logs.room_id",
        )
        .from("occupancy_logs")
        .whereNull("occupancy_logs.occupancy_end"); // Only include currently occupied rooms

    return occupiedRooms;
}
