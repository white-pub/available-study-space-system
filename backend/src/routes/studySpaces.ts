// Import the Router module from Express
import { Router } from 'express';

// Create a new router instance
const router = Router();

// Define a GET route for the root endpoint ('/')
router.get('/', (req, res) => {
    // Respond with a JSON object containing a message
    res.json({ message: "Study spaces route is working!" });
});

// Export the router to be used in other files
export default router;
