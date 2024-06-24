// routes/character.routes.js
import express from 'express';
import { createCharacter, getCharacter } from '../controllers/character.controller.js';

const router = express.Router();

router.post('/create', createCharacter);
router.get('/:id', getCharacter);

// Dodaj inne trasy, które będą potrzebne dla zarządzania postaciami

export default router;
