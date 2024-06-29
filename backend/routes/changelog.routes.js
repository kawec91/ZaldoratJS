import express from 'express';
import {
  createChangelog,
  getAllChangelogs,
  getChangelogById,
  deleteChangelogById,
  updateChangelogById,
  voteForChangelog,
} from '../controllers/changelog.controller.js';

const router = express.Router();

// POST /api/changelogs
router.post('/', createChangelog);

// GET /api/changelogs
router.get('/', getAllChangelogs);

// GET /api/changelogs/:id
router.get('/:id', getChangelogById);

// DELETE /api/changelogs/:id
router.delete('/:id', deleteChangelogById);

// PUT /api/changelogs/:id
router.put('/:id', updateChangelogById);

// POST /api/changelogs/:id/vote
router.post('/:id/vote', voteForChangelog);

export default router;
