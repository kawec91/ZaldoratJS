// routes/character.routes.js
import express from 'express';
import { createCharacter, getCharacter, deleteCharacter } from '../controllers/character.controller.js';

const router = express.Router();

router.post('/create', createCharacter);
router.get('/:id', getCharacter);
router.delete('/delete/:nickname', deleteCharacter); // Endpoint do usuwania postaci po nickname

// Dodaj inne trasy, które będą potrzebne dla zarządzania postaciami

export default router;
