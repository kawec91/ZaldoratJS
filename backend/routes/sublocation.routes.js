// routes/sublocation.routes.js
import express from 'express';
import SublocationController from '../controllers/sublocation.controller.js';

const router = express.Router();

router.post('/sublocations', SublocationController.createSublocation); // Tworzenie nowej podlokacji
router.get('/sublocations/:id', SublocationController.getSublocation); // Pobieranie podlokacji

export default router;
