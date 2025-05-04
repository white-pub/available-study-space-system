// Import the Router module from Express
import type { Express } from 'express';
import validate from "express-zod-safe";
import { z } from "zod";
import { createOccupiedSpaceLog, updateOccupiedSpaceLog, deleteOccupiedSpaceLog, getAllBuildingHours, getAllBuildingRooms, getAllBuildings, getAllOccupancyLog, getAllStudySpaces, getBuildingById, getBuildingHourById, getBuildingRoomById, getOccupiedSpaceLogById, getStudySpaceById, getAllRoomsWithBuildingInfo, getOccupiedRooms } from './db';
import { EventEmitter } from "events"; // for SSE and real-time update on occupied rooms

const occupancyLogEvents = new EventEmitter(); // Event emitter for occupancy log changes


const IdParamSchema = z.object({
    id: z.coerce.number().int().positive(),
});


// Allows the routering to a specific study space based off id or all of them.
export function studySpaceHandlers(e: Express): void {
    e.get("/study-spaces/:id",
        validate({
            params: IdParamSchema,
        }),

        async (req, res) => {
            const u = await getStudySpaceById(req.app.get("db"), req.params.id);
            res.send(u);
        });

    e.get("/study-spaces",

        async (req, res) => {
            const u = await getAllStudySpaces(req.app.get("db"));

            res.send(u);
        })

}

// Allows the routering to a specific building based off id or all of them.
export function buildingHandlers(e: Express): void {
    e.get("/buildings/:id",
        validate({
            params: IdParamSchema,
        }),

        async (req, res) => {
            const u = await getBuildingById(req.app.get("db"), req.params.id);
            res.send(u);
        });

    e.get("/buildings",

        async (req, res) => {
            const u = await getAllBuildings(req.app.get("db"));

            res.send(u);
        })


}

// Allows the routering to a specific building room based off id or all of them.
export function buildingRoomHandlers(e: Express): void {
    e.get("/building-rooms/:id",
        validate({
            params: IdParamSchema,
        }),

        async (req, res) => {
            const u = await getBuildingRoomById(req.app.get("db"), req.params.id);
            res.send(u);
        });

    e.get("/building-rooms",

        async (req, res) => {
            const u = await getAllBuildingRooms(req.app.get("db"));

            res.send(u);
        })


}

// Allows the routering to a specific occupied spaces log based off id or all of them.
export function occupiedSpaceLogHandlers(e: Express): void {
    e.get("/occupancy-log/:id",
        validate({
            params: IdParamSchema,
        }),

        async (req, res) => {
            const u = await getOccupiedSpaceLogById(req.app.get("db"), req.params.id);
            res.send(u);
        });

    e.get("/occupancy-log",

        async (req, res) => {
            const u = await getAllOccupancyLog(req.app.get("db"));

            res.send(u);
        })



    // POST route to create a new occupied space log
    e.post("/occupancy-log",
        validate({
            body: z.object({
                room_id: z.number(),
                occupancy_start: z.string().datetime(),
                occupancy_end: z.string().datetime().nullable(),
            }),
        }),

        async (req, res) => {
            const db = req.app.get("db");


            try {
                // Create the new occupancy log entry
                const newOccupied = await createOccupiedSpaceLog(db, {
                    room_id: req.body.room_id,
                    occupancy_start: new Date(req.body.occupancy_start),
                    occupancy_end: req.body.occupancy_end ? new Date(req.body.occupancy_end) : null,
                });

                if (!newOccupied) { // handle error if creating log failed
                    res.status(500).send({ error: "Failed to create occupancy log entry." });
                    return;
                }

                // Emit event and send success response
                occupancyLogEvents.emit("logChanged", db);
                res.status(201).send(newOccupied);

            } catch (error) { // catch other errors
                console.error("Error creating occupancy log:", error);
                res.status(500).send({ error: "Internal server error while processing occupancy log." });
            }

        }
    );



    // UPDATE route to update occupancy_end time in an occupied space log
    e.put("/occupancy-log/:id",
        validate({
            params: IdParamSchema,
            body: z.object({
                occupancy_end: z.string().datetime().nullable(),
            }),
        }),

        async (req, res) => {
            const db = req.app.get("db");

            try {
                const updatedOccupied = await updateOccupiedSpaceLog(db, req.params.id, {
                    occupancy_end: req.body.occupancy_end ? new Date(req.body.occupancy_end) : null,
                });

                if (!updatedOccupied) { // handle error if updating log failed
                    res.status(500).send({ error: "Failed to update occupancy log entry." });
                    return;
                }

                // Emit event and send success response
                occupancyLogEvents.emit("logChanged", db);
                res.status(201).send(updatedOccupied);

            } catch (error) { // catch other errors
                console.error("Error updating occupancy log:", error);
                res.status(500).send({ error: "Internal server error while updating occupancy log." });
            }
        }
    );

    // DELETE route to remove an occupied space log entry
    e.delete("/occupancy-log/:id",
        validate({
            params: IdParamSchema
        }),

        async (req, res) => {
            const db = req.app.get("db");

            const result = await deleteOccupiedSpaceLog(db, req.params.id);

            if (result.success) {
                occupancyLogEvents.emit("logChanged", db); // Emit event to SSE
                res.send(result);
            } else {
                res.status(result.error === "Occupied space log entry not found" ? 404 : 500).send(result);
            }
        }
    );


}


// Allows the routering to a specific building hours based off id or all of them.
export function buildingHoursHandlers(e: Express): void {
    e.get("/building-hours/:id",
        validate({
            params: IdParamSchema,
        }),

        async (req, res) => {
            const u = await getBuildingHourById(req.app.get("db"), req.params.id);
            res.send(u);
        });

    e.get("/building-hours",

        async (req, res) => {
            const u = await getAllBuildingHours(req.app.get("db"));

            res.send(u);
        })


}

// Api for the tables that has all building info attached to room info
export function allRoomWithBuildingInfoHandlers(e: Express): void {
    e.get("/all-room-with-building-info",

        async (req, res) => {
            const db = req.app.get("db");

            try {
                // Fetch the joined table from the database
                const joinedTable = await getAllRoomsWithBuildingInfo(db); 
                res.status(200).send(joinedTable);
            } catch (error) { // error handling
                console.error("Error fetching joined table - allRoomWithBuildingInfo:", error);
                res.status(500).send({ error: "Failed to fetch joined table - allRoomWithBuildingInfo" });
            }
        }
    );
}

// Implement Server-Sent Events (SSE) to sent the newest occupied room list
// Only sent out dta when occupancy_log is changed by occupiedSpaceLogHandlers
const sseClients: any[] = []; // Store active SSE connections

export function occupiedRoomsSSEHandler(e: Express): void {
    e.get("/occupied-rooms-stream", (req, res) => {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        // Add the client to the list of SSE connections
        sseClients.push(res);

        // Remove the client when the connection is closed
        req.on("close", () => {
            const index = sseClients.indexOf(res);
            if (index !== -1) {
                sseClients.splice(index, 1);
            }
        });
    });

    // Listen for occupancy log changes
    occupancyLogEvents.on("logChanged", async (db) => {
        try {
            // Fetch the updated list of occupied rooms
            const occupiedRooms = await getOccupiedRooms(db);

            // Send updates to all SSE clients
            sseClients.forEach((client) => {
                client.write(`data: ${JSON.stringify(occupiedRooms)}\n\n`);
            });
        } catch (error) {
            console.error("Error fetching occupied rooms:", error);
        }
    });
}
