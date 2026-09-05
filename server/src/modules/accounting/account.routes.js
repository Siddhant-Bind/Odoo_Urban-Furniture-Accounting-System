import express from 'express';
import * as accountController from './account.controller.js';
import requireAuth from '../../middleware/authMiddleware.js';

const router = express.Router();

router.use(requireAuth);

router.get('/', accountController.getAccounts);
router.get('/:id', accountController.getAccountById);
router.put('/:id', accountController.updateAccount);

export default router;
