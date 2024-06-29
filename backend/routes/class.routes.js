import express from 'express';
import { createClass, getClass, deleteClass, getAllClasses, updateClass } from '../controllers/class.controller.js';

const router = express.Router();

router.post('/create', createClass); // Endpoint do tworzenia klasy
router.get('/getall', getAllClasses); // Endpoint do pobierania wszystkich klas
router.get('/:id', getClass); // Endpoint do pobierania klasy
router.delete('/delete/:id', deleteClass); // Endpoint do usuwania klasy
router.patch('/:id', updateClass); // Endpoint do edycji klasy

export default router;
