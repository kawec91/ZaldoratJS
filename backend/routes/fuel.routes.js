import express from 'express';
import FuelController from '../controllers/fuel.controller.js';

const router = express.Router();

// Trasa do dodawania nowego paliwa
router.post('/add', FuelController.addFuel);

export default router;
