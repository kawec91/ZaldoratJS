import express from 'express';
import {
  createCharacter,
  deleteCharacter,
  getCharacter,
  updateCharacter,
  getCharactersByOwner,
  getCharacterLocation,
  getCharacterCoordinates,
  updateCharacterCoordinates,
  getAllCharacters, // Import the new function
} from '../controllers/character.controller.js';

const router = express.Router();

// Endpoint to create a character
router.post('/create', createCharacter);

// Endpoint to get all characters
router.get('/', getAllCharacters); // New endpoint to fetch all characters

// Endpoint to get characters by owner
router.get('/owner/:ownerId', getCharactersByOwner);

// Endpoint to get a character by ID
router.get('/:id', getCharacter);

// Endpoint to get character location by characterId
router.get('/:characterId/location', getCharacterLocation);

// Endpoint to update a character by ID
router.put('/update/:id', updateCharacter);

// Endpoint to delete a character by nickname
router.delete('/delete/:nickname', deleteCharacter);

// Endpoint to get coordinates of a character by ID
router.get('/:id/coords', getCharacterCoordinates);

// Endpoint to update character coordinates
router.put('/:id/coords', updateCharacterCoordinates); // New route for updating coordinates

export default router;
