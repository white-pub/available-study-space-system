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

// Define a building room
type BuildingRoom = {
    building_room_id: number;
    building_id: Building["building_id"];
    room_id: StudySpace["room_id"];
    created_at: Date;
    updated_at: Date;
}

// Define occupied spaces
type OccupiedSpaces = {
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



// Type = Type and more
// type OccupiedStudySpace = StudySpace & {
//     occupied: true;
// };

// Type = Only specifics from another type
//type CreateStudySpace = Pick<StudySpace, "room_id">


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

// Fetch an occupied space by its id.
// null required because the id either exists or does not.
export async function getOccupiedSpaceById(db: Knex, id: number): Promise<OccupiedSpaces | null> {
    const result = await db
        .select("*")
        .from("occupancy_logs")
        .where("log_id", "=", id)
        .first(); // Should return the first id that matches when fetching.
    return result as OccupiedSpaces | null;

}

// Fetch all occupied spaces for listing.
export async function getAllOccupiedSpaces(db: Knex): Promise<OccupiedSpaces[]> {
    const result = await db
        .select("*")
        .from("occupancy_logs")

    return result as OccupiedSpaces[];
}

export async function createOccupiedSpace(db: Knex, data: {
    room_id: number;
    occupancy_start: Date;
    occupancy_end?: Date | null;
}): Promise<OccupiedSpaces | null> {
    try {
        // Insert data using Knex's query builder
        const [insertId] = await db("occupancy_logs")
            .insert({
                room_id: data.room_id,
                occupancy_start: data.occupancy_start.toISOString().replace('Z','').replace('T', ' '), // Ensure proper format
                occupancy_end: data.occupancy_end ? data.occupancy_end.toISOString().replace('Z','').replace('T', ' ') : null,
                created_at: db.fn.now(),
                updated_at: db.fn.now(),
            })
            .returning("log_id"); // Ensure returning inserted ID

        // Fetch the inserted row
        const insertedRow = await db("occupancy_logs")
            .where("log_id", insertId)
            .first();

        return insertedRow as OccupiedSpaces | null;
    } catch (error) {
        console.error("Database insertion failed:", error);
        return null;
    }
}

export async function updateOccupiedSpace(db: Knex, id: number, data:{
    occupancy_end?: Date | null;
}): Promise<OccupiedSpaces | null> {
    try{
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

export async function deleteOccupiedSpace(db: Knex, id: number) {
    try {
        const deletedOccupied = await db("occupancy_logs")
            .select("*")
            .where("log_id", "=", id)
            .first()
            .del();

        return deletedOccupied ? { success: true, message: "Occupied space deleted successfully" } : { success: false, error: "Occupied space not found" };
    } catch (error) {
        return { success: false, error: "Failed to delete occupied space" };
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