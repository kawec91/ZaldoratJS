import express from 'express';
import {
  createCharacter,
  deleteCharacter,
  getCharacter,
  updateCharacter,
  getCharactersByOwner,
  getCharacterLocation,
} from '../controllers/character.controller.js';

const router = express.Router();

router.post('/create', createCharacter); // Endpoint do tworzenia postaci
router.get('/:id', getCharacter); // Endpoint do pobierania postaci
router.delete('/delete/:nickname', deleteCharacter); // Endpoint do usuwania postaci
router.put('/update/:id', updateCharacter); // Endpoint do aktualizacji postaci
router.get('/owner/:ownerId', getCharactersByOwner); // Endpoint do pobierania postaci dla ownera
router.get('/:characterId/location', getCharacterLocation);


export default router;
