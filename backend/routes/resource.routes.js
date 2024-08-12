import express from 'express';
import {
  createResource,
  getResourceById,
  updateResourceById,
  deleteResourceById,
  getAllResources,
} from '../controllers/resource.controller.js';

const router = express.Router();

// Route to create a new resource
router.post('/create', createResource);

// Route to get a resource by ID
router.get('/:id', getResourceById);

// Route to update a resource by ID
router.put('/:id', updateResourceById);

// Route to delete a resource by ID
router.delete('/:id', deleteResourceById);

// Route to get all resources
router.get('/', getAllResources);

export default router;
