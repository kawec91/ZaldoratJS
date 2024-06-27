// routes/location.routes.js
import express from 'express';
import LocationController from '../controllers/location.controller.js';

const router = express.Router();

router.post('/locations', LocationController.createLocation); // Tworzenie nowej lokacji
router.get('/locations/:id', LocationController.getLocation); // Pobieranie lokacji

export default router;
