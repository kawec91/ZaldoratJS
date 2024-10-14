import express from 'express';
import {
  createBackpack,
  getBackpackById,
  addItemToBackpack,
  removeItemFromBackpack,
  getBackpackByOwnerId,
} from '../controllers/backpack.controller.js';

const router = express.Router();

// Route to create a backpack for a character
router.post('/owner/:characterId', createBackpack); // Use POST to /owner/:characterId for clarity

// Route to get a backpack by its ID
router.get('/:id', getBackpackById);

// Route to get a backpack by its owner's ID
router.get('/owner/:ownerId', getBackpackByOwnerId); // Added owner-specific route

// Route to add an item to a backpack
router.post('/:id/items', addItemToBackpack); // Changed to a more RESTful endpoint

// Route to remove an item from a backpack 
router.delete('/:id/items/:itemId', removeItemFromBackpack); // Changed to a more RESTful endpoint

export default router;
