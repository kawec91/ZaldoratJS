import express from 'express';
import OriginController from '../controllers/origin.controller.js';

const router = express.Router();

router.post('/create', OriginController.createOrigin);
router.get('/get', OriginController.getOrigin);
router.delete('/delete/:id', OriginController.deleteOrigin);

export default router;
