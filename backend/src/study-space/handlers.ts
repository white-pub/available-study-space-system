// Import the Router module from Express
import type { Express } from 'express';
import { getUserById } from "./services";
import validate from "express-zod-safe";
import { z } from "zod";
import { getAllStudySpaces, getStudySpaceById } from './db';

const IdParamSchema = z.object({
    id: z.coerce.number().int().positive(),
});

type IdParam = z.infer<typeof IdParamSchema>;

// Allows the routering to a specific study space based off id.
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
