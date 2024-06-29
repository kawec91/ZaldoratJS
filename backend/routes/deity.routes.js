import express from 'express';
import { createDeity, getDeity, deleteDeity, getAllDeities, updateDeity } from '../controllers/deity.controller.js';

const router = express.Router();

router.post('/create', createDeity); // Endpoint do tworzenia bóstwa
router.get('/:id', getDeity); // Endpoint do pobierania bóstwa
router.get('/getall', getAllDeities); // Endpoint do pobierania wszystkich bóstw
router.delete('/delete/:id', deleteDeity); // Endpoint do usuwania bóstwa
router.patch('/:id', updateDeity); // Endpoint do edycji bóstwa

export default router;
