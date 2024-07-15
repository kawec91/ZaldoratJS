import express from 'express';
import {
  createBackpack,
  getBackpackById,
  addItemToBackpack,
  removeItemFromBackpack,
} from '../controllers/backpack.controller.js';

const router = express.Router();

// Route to create a backpack for a character
router.post('/create/:characterId', createBackpack);

// Route to get a backpack by ID
router.get('/:id', getBackpackById);

// Route to add an item to a backpack
router.post('/:id/add-item', addItemToBackpack);

// Route to remove an item from a backpack
router.delete('/:id/remove-item/:itemId', removeItemFromBackpack);

export default router;
