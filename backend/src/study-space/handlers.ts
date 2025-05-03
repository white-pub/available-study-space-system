// Import the Router module from Express
import type { Express } from 'express';
import validate from "express-zod-safe";
import { z } from "zod";
import { createOccupiedSpaceLog, updateOccupiedSpaceLog, deleteOccupiedSpaceLog, getAllBuildingHours, getAllBuildingRooms, getAllBuildings, getAllOccupancyLog, getAllStudySpaces, getBuildingById, getBuildingHourById, getBuildingRoomById, getOccupiedSpaceLogById, getStudySpaceById } from './db';

const IdParamSchema = z.object({
    id: z.coerce.number().int().positive(),
});

type IdParam = z.infer<typeof IdParamSchema>;

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

            const newOccupied = await createOccupiedSpaceLog(db, {
                room_id: req.body.room_id,
                occupancy_start: new Date(req.body.occupancy_start),
                occupancy_end: req.body.occupancy_end ? new Date(req.body.occupancy_end) : null,
            });

            res.send(newOccupied);
        }
    );

    // UPDATE route to update occupancy_end time in an occupied space
    e.put("/occupancy-log/:id",
        validate({
            params: IdParamSchema,
            body: z.object({
                occupancy_end: z.string().datetime().nullable(),
            }),
        }),

        async (req, res) => {
            const db = req.app.get("db");

            const udpatedOccupied = await updateOccupiedSpaceLog(db, req.params.id, {
                occupancy_end: req.body.occupancy_end ? new Date(req.body.occupancy_end) : null,
            });

            res.send(udpatedOccupied);
        }
    );

    // DELETE route to remove an occupied space
    e.delete("/occupancy-log/:id",
        validate({
            params: IdParamSchema
        }),

        async (req, res) => {
            const db = req.app.get("db");

            const result = await deleteOccupiedSpaceLog(db, req.params.id);

            if (result.success) {
                res.send(result);
            } else {
                res.status(result.error === "Occupied space not found" ? 404 : 500).send(result);
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