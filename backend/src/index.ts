// Import the required modules
import express from 'express'; // Express is used to create the web server
import { studySpaceHandlers } from "./study-space/handlers"; // Import the routes for study spaces

const PORT = process.env.PORT || 3000; // Set the port, defaulting to 3000 if not provided

function registerRoutes(server: express.Express): void {
    studySpaceHandlers(server);
}

function bootstrapApp(): express.Express {
    const server = express(); // Create an instance of the Express app

    registerRoutes(server);

    return server;
}

function startServer() {
    const server = bootstrapApp();

    // Start the server and log the URL where it's running
    server.listen(PORT, () => console.log("Running! http://localhost:3000"));
}