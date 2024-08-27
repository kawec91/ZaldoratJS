// routes/furnace.routes.js
import express from 'express';
import FurnaceController from '../controllers/furnace.controller.js';

const router = express.Router();

// Endpointy do obsługi pieca
router.post('/:characterId/create', FurnaceController.createFurnace); // Zaktualizowana trasa do tworzenia pieca
router.post('/:characterId/:furnaceId/light', FurnaceController.lightFurnace);
router.post('/:characterId/:furnaceId/extinguish', FurnaceController.extinguishFurnace);
router.post('/:characterId/:furnaceId/increase-temperature', FurnaceController.increaseTemperature);
router.post('/:characterId/:furnaceId/decrease-temperature', FurnaceController.decreaseTemperature);
router.post('/:characterId/:furnaceId/smelt', FurnaceController.smeltMinerals);

export default router;