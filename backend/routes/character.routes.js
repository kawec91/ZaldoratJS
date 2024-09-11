import express from 'express';
import {
  createCharacter,
  deleteCharacter,
  getCharacter,
  updateCharacter,
  getCharactersByOwner,
  getCharacterLocation,
  getCharacterCoordinates,

} from '../controllers/character.controller.js';

const router = express.Router();

router.post('/create', createCharacter); // Endpoint do tworzenia postaci
router.get('/owner/:ownerId', getCharactersByOwner); // Endpoint do pobierania postaci dla ownera
router.get('/:id', getCharacter); // Endpoint do pobierania postaci
router.get('/:characterId/location', getCharacterLocation); // Endpoint do pobierania lokalizacji postaci
router.put('/update/:id', updateCharacter); // Endpoint do aktualizacji postaci
router.delete('/delete/:nickname', deleteCharacter); // Endpoint do usuwania postaci
// Dodaj trasę do pobierania współrzędnych
router.get('/:id/coords', getCharacterCoordinates);
export default router;
