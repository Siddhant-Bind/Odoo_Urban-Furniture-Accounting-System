import express from 'express';
import * as journalController from './journal.controller.js';
import requireAuth from '../../middleware/authMiddleware.js';

const router = express.Router();

router.use(requireAuth);

router.post('/', journalController.createJournal);
router.get('/', journalController.getJournals);
router.get('/:id', journalController.getJournalById);
router.put('/:id', journalController.updateJournal);

export default router;
