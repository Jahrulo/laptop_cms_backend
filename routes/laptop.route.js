import { Router } from "express";
import {
  createLaptop,
  getLaptops,
  deleteLaptop,
  updateLaptop,
} from "../controllers/laptop.controller.js";
import Auth from "../middlewares/auth.middleware.js";

const laptopRouter = Router();

/**
 * @swagger
 * /laptop/getLaptops:
 *   get:
 *     summary: Retrieve a list of laptops
 *     tags:
 *       - Laptops
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of laptops
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The laptop ID
 *                   brand:
 *                     type: string
 *                     description: The laptop brand name eg(Apple)
 *                   model:
 *                     type: string
 *                     description: The laptop model
 *                   serialNumber:
 *                     type: string
 *                     description: The laptop unique serial number
*                   status:
 *                     type: string
 *                     description: Enums of (Available, Needs_repair, Distributed e.t.c)
*                   purchaseDate:
 *                     type: string
 *                     description: Purchase date of the laptop
  *                   note:
 *                     type: string
 *                     description: Condition of the laptop
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
laptopRouter.get("/getLaptops", Auth, getLaptops);

/**
 * @swagger
 * /laptop/addLaptop:
 *   post:
 *     summary: Add a new laptop
 *     tags:
 *       - Laptops
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                   brand:
 *                     type: string
 *                     description: The laptop brand name eg(Apple)
 *                   model:
 *                     type: string
 *                     description: The laptop model
 *                   serialNumber:
 *                     type: string
 *                     description: The laptop unique serial number
*                   status:
 *                     type: string
 *                     description: Enums of (Available, Needs_repair, Distributed e.t.c)
*                   purchaseDate:
 *                     type: string
 *                     description: Purchase date of the laptop
  *                   note:
 *                     type: string
 *                     description: Condition of the laptop
 *     responses:
 *       201:
 *         description: Laptop successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the created laptop
 *                 name:
 *                   type: string
 *                   description: The name of the laptop
 *                 brand:
 *                   type: string
 *                   description: The brand of the laptop
 *                 price:
 *                   type: number
 *                   description: The price of the laptop
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
laptopRouter.post("/addLaptop", Auth, createLaptop);

/**
 * @swagger
 * /laptop/updateLaptop/{id}:
 *   patch:
 *     summary: Update an existing laptop
 *     tags:
 *       - Laptops
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the laptop to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
  *                   brand:
 *                     type: string
 *                     description: The laptop brand name eg(Apple)
 *                   model:
 *                     type: string
 *                     description: The laptop model
 *                   serialNumber:
 *                     type: string
 *                     description: The laptop unique serial number
*                   status:
 *                     type: string
 *                     description: Enums of (Available, Needs_repair, Distributed e.t.c)
*                   purchaseDate:
 *                     type: string
 *                     description: Purchase date of the laptop
  *                   note:
 *                     type: string
 *                     description: Condition of the laptop
 *     responses:
 *       200:
 *         description: Laptop successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the updated laptop
 *                 name:
 *                   type: string
 *                   description: The updated name of the laptop
 *                 brand:
 *                   type: string
 *                   description: The updated brand of the laptop
 *                 price:
 *                   type: number
 *                   description: The updated price of the laptop
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Laptop not found
 *       500:
 *         description: Internal server error
 */
laptopRouter.patch("/updateLaptop/:id", Auth, updateLaptop);

/**
 * @swagger
 * /laptop/deleteLaptop/{id}:
 *   delete:
 *     summary: Delete a laptop
 *     tags:
 *       - Laptops
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the laptop to delete
 *     responses:
 *       200:
 *         description: Laptop successfully deleted
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Laptop not found
 *       500:
 *         description: Internal server error
 */
laptopRouter.delete("/deleteLaptop/:id", Auth, deleteLaptop);

export default laptopRouter;
