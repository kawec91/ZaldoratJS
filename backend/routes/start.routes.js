import express from 'express';
import StartController from '../controllers/start.controller.js';

const router = express.Router();

router.get('/get', StartController.getLastNews);
router.post('/add', StartController.addNews); // Definiowanie trasy POST /api/start/add

export default router;
