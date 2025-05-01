// This file defines the endpoint paths for auth-related actions
import { Router } from "express"; // Import Router from express

import {
  signUp,
  signIn,
  signOut,
  getUser,
} from "../controllers/user.controller.js"; // Import controller functions
import Auth from "../middlewares/auth.middleware.js";

const authRouter = Router(); // Create a new router instance

// Define the routes

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Registers a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               role:
 *                 type: string
 *                 example: Admin
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: Conflict (e.g., email already exists)
 *       500:
 *         description: Internal server error
 */
authRouter.post("/sign-up", signUp);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Logs in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid credentials
 */
authRouter.post("/login", signIn);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get the authenticated user's information
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *       401:
 *         description: Unauthorized
 */
authRouter.get("/me", Auth, getUser);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logs out a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successful logout
 */
authRouter.post("/logout", signOut);

export default authRouter; // Export the router to use in server.js
