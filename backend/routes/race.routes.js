import express from 'express';
import { createRace, getRace, deleteRace, getAllRaces } from '../controllers/race.controller.js';

const router = express.Router();

router.post('/create', createRace); // Endpoint do tworzenia rasy
router.get('/getall', getAllRaces); // Endpoint do pobierania wszystkich ras
router.get('/:id', getRace); // Endpoint do pobierania jednej rasy
router.delete('/delete/:id', deleteRace); // Endpoint do usuwania rasy

export default router;