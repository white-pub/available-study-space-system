/*
index.ts
Description: This file holds the server maintance for the backend.
Written by: Abe Gomez and Anna Chen

*/

// Import the required modules
import express from 'express'; // Express is used to create the web server
import bodyParser from "body-parser"
import { buildingHandlers, buildingHoursHandlers, buildingRoomHandlers, occupiedSpaceLogHandlers, studySpaceHandlers, allRoomWithBuildingInfoHandlers, occupiedRoomsSSEHandler} from "./study-space/handlers"; // Import the routes for study spaces
import knex from 'knex';
import config from "../knexfile";
import cors from "cors";


const PORT = process.env.PORT || 3000; // Set the port, defaulting to 3000 if not provided

function registerRoutes(server: express.Express): void {
    studySpaceHandlers(server);
    buildingHandlers(server);
    buildingRoomHandlers(server);
    occupiedSpaceLogHandlers(server);
    buildingHoursHandlers(server);
    allRoomWithBuildingInfoHandlers(server);
    occupiedRoomsSSEHandler(server);
}

function bootstrapApp(): express.Express {
    const server = express(); // Create an instance of the Express app
    
    // Apply global middleware
    server.use(cors()); // Allows all origins
    server.use(bodyParser.json()); // Parse JSON request bodies

    // Set up the database connection
    server.set("db", knex(config.development));

    // Register all routes
    registerRoutes(server);

    return server;
}

function startServer() {
    const server = bootstrapApp();

    // Start the server and log the URL where it's running
    server.listen(PORT, () => console.log("Running! http://localhost:3000"));
}

startServer();

export { bootstrapApp };