// routes/inventory.routes.js
import express from 'express';
import { equipItem, unequipItem, calculateTotalBuffs } from '../controllers/inventory.controller.js';

const router = express.Router();

router.post('/equip', equipItem);
router.post('/unequip', unequipItem);
router.get('/buffs/:characterId', calculateTotalBuffs);

export default router;
