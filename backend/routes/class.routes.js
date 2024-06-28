import express from 'express';
import { createClass, getClass, deleteClass, getAllClasses } from '../controllers/class.controller.js';

const router = express.Router();

router.post('/create', createClass); // Endpoint do tworzenia klasy
router.get('/getall', getAllClasses); // Endpoint do pobierania wszystkich klas
router.get('/:id', getClass); // Endpoint do pobierania jednej klasy
router.delete('/delete/:id', deleteClass); // Endpoint do usuwania klasy

export default router;
