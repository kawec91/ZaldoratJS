import express from 'express';
import { createClass, getClass, deleteClass } from '../controllers/class.controller.js';

const router = express.Router();

router.post('/create', createClass); // Endpoint do tworzenia klasy
router.get('/:id', getClass); // Endpoint do pobierania klasy
router.delete('/delete/:id', deleteClass); // Endpoint do usuwania klasy

export default router;
