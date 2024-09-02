import express from 'express';
import AncestryController from '../controllers/ancestry.controller.js';

const router = express.Router();

// Trasy dla pochodzeń
router.post('/ancestries', AncestryController.createAncestry);
router.get('/ancestries', AncestryController.getAllAncestries);
router.get('/ancestries/race/:raceId', AncestryController.getAncestriesByRace);

export default router;
