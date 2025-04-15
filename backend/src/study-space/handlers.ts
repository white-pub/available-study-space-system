// Import the Router module from Express
import type { Express } from 'express';
import { getUserById } from "./services";
import validate from "express-zod-safe";
import { z } from "zod";

const IdParamSchema = z.object({
    id: z.coerce.number().int().positive(),
});

type IdParam = z.infer<typeof IdParamSchema>;

export function studySpaceHandlers(e: Express): void {
    e.get("/:id", 
        validate({
            params: IdParamSchema,
        }),

    async (req, res) => {
        const u = await getUserById(req.params.id);
        res.send("u.name");
    });
}
