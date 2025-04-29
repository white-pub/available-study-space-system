// Import the Router module from Express
import type { Express } from 'express';
import validate from "express-zod-safe";
import { z } from "zod";
import { getAllBuildingHours, getAllBuildingRooms, getAllBuildings, getAllOccupiedSpaces, getAllStudySpaces, getBuildingById, getBuildingHourById, getBuildingRoomById, getOccupiedSpaceById, getStudySpaceById } from './db';

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

// Allows the routering to a specific occupied spaces based off id or all of them.
export function occupiedSpacesHandlers(e: Express): void {
    e.get("/occupied-spaces/:id", 
        validate({
            params: IdParamSchema,
        }),

    async (req, res) => {
        const u = await getOccupiedSpaceById(req.app.get("db"), req.params.id);
        res.send(u);
    });

    e.get("/occupied-spaces", 
        
    async (req, res) => {
        const u = await getAllOccupiedSpaces(req.app.get("db"));

        res.send(u);
    })

    
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