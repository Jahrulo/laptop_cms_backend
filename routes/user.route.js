// This file defines the endpoint paths for auth-related actions
import { Router } from "express"; // Import Router from express

import { signUp, signIn } from "../controllers/user.controller.js"; // Import controller functions

const authRouter = Router(); // Create a new router instance

// Define the routes
authRouter.post("/sign-up", signUp);
authRouter.post("/login", signIn);

export default authRouter; // Export the router to use in server.js
