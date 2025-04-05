// Import the required modules
import express from 'express'; // Express is used to create the web server
import studySpacesRoutes from './routes/studySpaces'; // Import the routes for study spaces

const app = express(); // Create an instance of the Express app
const PORT = process.env.PORT || 3000; // Set the port, defaulting to 3000 if not provided

app.use(express.json()); // Middleware to parse incoming JSON requests
app.use('/api/study-spaces', studySpacesRoutes); // Use the study spaces routes for the '/api/study-spaces' endpoint

// Start the server and log the URL where it's running
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`); // Output the server URL with port
});
