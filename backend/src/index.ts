// Import the required modules
import express from 'express'; // Express is used to create the web server
import bodyParser from "body-parser"
import { buildingHandlers, buildingHoursHandlers, buildingRoomHandlers, occupiedSpacesHandlers, studySpaceHandlers } from "./study-space/handlers"; // Import the routes for study spaces
import knex from 'knex';
import config from "../knexfile"


const PORT = process.env.PORT || 3000; // Set the port, defaulting to 3000 if not provided

function registerRoutes(server: express.Express): void {
    studySpaceHandlers(server);
    buildingHandlers(server);
    buildingRoomHandlers(server);
    occupiedSpacesHandlers(server);
    buildingHoursHandlers(server);
}

function bootstrapApp(): express.Express {
    const server = express(); // Create an instance of the Express app
    server.use(bodyParser.json())

    server.set("db", knex(config.development));

    registerRoutes(server);

    return server;
}

function startServer() {
    const server = bootstrapApp();

    // Start the server and log the URL where it's running
    server.listen(PORT, () => console.log("Running! http://localhost:3000"));
}

startServer();