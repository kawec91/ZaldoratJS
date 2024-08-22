import express from 'express';
import {
  createMine,
  getMine,
  updateMineQuantity,
  deleteMine,
} from '../controllers/mine.controller.js';

const router = express.Router();

// Trasa do tworzenia nowej kopalni
router.post('/create', createMine);

// Trasa do pobierania informacji o kopalni
router.get('/:mineId', getMine);

// Trasa do aktualizacji ilości surowca w kopalni
router.put('/:mineId/quantity', updateMineQuantity);

// Trasa do usuwania kopalni
router.delete('/:mineId', deleteMine);

export default router;
