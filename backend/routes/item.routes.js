// backend/routes/item.routes.js
import express from 'express';
import { createItem, getAllItems, getItemById, updateItem, deleteItem } from '../controllers/item.controller.js';

const router = express.Router();

router.post('/', createItem); // Create an item
router.get('/', getAllItems); // Get all items
router.get('/:id', getItemById); // Get a single item by ID
router.put('/:id', updateItem); // Update an item
router.delete('/:id', deleteItem); // Delete an item

export default router;
