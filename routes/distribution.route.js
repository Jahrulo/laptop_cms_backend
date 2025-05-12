import { Router } from "express";
import Auth from "../middlewares/auth.middleware.js";
import {
  distributeLaptop,
  getAllDistributions,
  markAsReturned,
  updateDistribution,
} from "../controllers/distribution.controller.js";

const distributeRoute = Router();

/**
 * @swagger
 * /distributions/distribute
 *   post:
 *     summary: Distribute a laptop to a user.
 *     description: This endpoint allows authorized users to distribute a laptop to a specified user.
 *     tags:
 *       - Distribution
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               laptopId:
 *                 type: string
 *                 description: The ID of the laptop being distributed.
 *                 example: "67890"
 *               recipientName:
 *                 type: string
 *                 description: The name of the recipient.
 *                 example: "John Doe"
 *               recipientEmail:
 *                 type: string
 *                 description: The email of the recipient.
 *                 example: "johndoe@example.com"
 *               recipientPhone:
 *                 type: string
 *                 description: The phone number of the recipient.
 *                 example: "+1234567890"
 *               dateDistributed:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time the laptop was distributed.
 *                 example: "2023-03-15T10:00:00Z"
 *               expectedReturnDate:
 *                 type: string
 *                 format: date-time
 *                 description: The expected return date of the laptop.
 *                 example: "2023-04-15T10:00:00Z"
 *               dateReturn:
 *                 type: string
 *                 format: date-time
 *                 description: The actual return date of the laptop (if applicable).
 *                 example: "2023-04-10T10:00:00Z"
 *               notes:
 *                 type: string
 *                 description: Additional notes about the distribution.
 *                 example: "Laptop distributed for project work."
 *     responses:
 *       200:
 *         description: Laptop successfully distributed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Laptop distributed successfully."
 *       400:
 *         description: Bad request. Missing or invalid parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid userId or laptopId."
 *       401:
 *         description: Unauthorized. User is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while distributing the laptop."
 */
distributeRoute.post("/distribute", Auth, distributeLaptop);

/**
 *@Swagger
 * /distributions/:
 * get:
 * summary: Gets all distributions
 * description: This endpoint allows authorized user to see the details of distributions
 *     tags:
 *       - Distribution
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the distribution to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               laptopId:
 *                 type: string
 *                 description: The ID of the laptop being distributed.
 *                 example: "67890"
 *               recipientName:
 *                 type: string
 *                 description: The name of the recipient.
 *                 example: "John Doe"
 *               recipientEmail:
 *                 type: string
 *                 description: The email of the recipient.
 *                 example: "johndoe@example.com"
 *               recipientPhone:
 *                 type: string
 *                 description: The phone number of the recipient.
 *                 example: "+1234567890"
 *               expectedReturnDate:
 *                 type: string
 *                 format: date-time
 *                 description: The expected return date of the laptop.
 *                 example: "2023-04-15T10:00:00Z"
 *               notes:
 *                 type: string
 *                 description: Additional notes about the distribution.
 *                 example: "Updated distribution details."
 *     responses:
 *       200:
 *         description: Successfully updated the distribution.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Distribution updated successfully."
 *       400:
 *         description: Bad request. Missing or invalid parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid distribution ID."
 *       401:
 *         description: Unauthorized. User is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while updating the distribution."
 */
distributeRoute.get("/", Auth, getAllDistributions);

/**
 * @swagger
 * /distributions/updateDistribution/{id}:
 *   patch:
 *     summary: Update a laptop distribution.
 *     description: This endpoint allows authorized users to update the details of a specific laptop distribution.
 *     tags:
 *       - Distribution
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the distribution to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               laptopId:
 *                 type: string
 *                 description: The ID of the laptop being distributed.
 *                 example: "67890"
 *               recipientName:
 *                 type: string
 *                 description: The name of the recipient.
 *                 example: "John Doe"
 *               recipientEmail:
 *                 type: string
 *                 description: The email of the recipient.
 *                 example: "johndoe@example.com"
 *               recipientPhone:
 *                 type: string
 *                 description: The phone number of the recipient.
 *                 example: "+1234567890"
 *               expectedReturnDate:
 *                 type: string
 *                 format: date-time
 *                 description: The expected return date of the laptop.
 *                 example: "2023-04-15T10:00:00Z"
 *               notes:
 *                 type: string
 *                 description: Additional notes about the distribution.
 *                 example: "Updated distribution details."
 *     responses:
 *       200:
 *         description: Successfully updated the distribution.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Distribution updated successfully."
 *       400:
 *         description: Bad request. Missing or invalid parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid distribution ID."
 *       401:
 *         description: Unauthorized. User is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while updating the distribution."
 */
distributeRoute.patch("/updateDistribution/:id", Auth, updateDistribution);

/**
 * @swagger
 * /distributions/markAsReturned/{id}:
 *   patch:
 *     summary: Mark a laptop as returned.
 *     description: This endpoint allows authorized users to mark a specific laptop distribution as returned.
 *     tags:
 *       - Distribution
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the distribution to mark as returned.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dateReturn:
 *                 type: string
 *                 format: date-time
 *                 description: The actual return date of the laptop.
 *                 example: "2023-04-10T10:00:00Z"
 *     responses:
 *       200:
 *         description: Successfully marked the laptop as returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Laptop marked as returned successfully."
 *       400:
 *         description: Bad request. Missing or invalid parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid distribution ID."
 *       401:
 *         description: Unauthorized. User is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while marking the laptop as returned."
 */

distributeRoute.patch("/markAsReturned/:id", Auth, markAsReturned);

export default distributeRoute;

/**
 * @swagger
 * /distributions/:
 *   get:
 *     summary: Retrieve all laptop distributions.
 *     description: This endpoint allows authorized users to fetch a list of all laptop distributions.
 *     tags:
 *       - Distribution
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all distributions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the distribution.
 *                     example: "12345"
 *                   laptopId:
 *                     type: string
 *                     description: The ID of the laptop being distributed.
 *                     example: "67890"
 *                   recipientName:
 *                     type: string
 *                     description: The name of the recipient.
 *                     example: "John Doe"
 *                   recipientEmail:
 *                     type: string
 *                     description: The email of the recipient.
 *                     example: "johndoe@example.com"
 *                   recipientPhone:
 *                     type: string
 *                     description: The phone number of the recipient.
 *                     example: "+1234567890"
 *                   dateDistributed:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time the laptop was distributed.
 *                     example: "2023-03-15T10:00:00Z"
 *                   expectedReturnDate:
 *                     type: string
 *                     format: date-time
 *                     description: The expected return date of the laptop.
 *                     example: "2023-04-15T10:00:00Z"
 *                   dateReturn:
 *                     type: string
 *                     format: date-time
 *                     description: The actual return date of the laptop (if applicable).
 *                     example: "2023-04-10T10:00:00Z"
 *                   notes:
 *                     type: string
 *                     description: Additional notes about the distribution.
 *                     example: "Laptop distributed for project work."
 *       401:
 *         description: Unauthorized. User is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while retrieving distributions."
 */
