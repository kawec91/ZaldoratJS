import express from 'express';
import { createRace, getRace, deleteRace } from '../controllers/race.controller.js';

const router = express.Router();

router.post('/create', createRace); // Endpoint do tworzenia rasy
router.get('/:id', getRace); // Endpoint do pobierania rasy
router.delete('/delete/:id', deleteRace); // Endpoint do usuwania rasy

export default router;
