import express from 'express';
import * as balanceSheetController from './balanceSheet.controller.js';
import * as profitLossController from './profitLoss.controller.js';
import requireAuth from '../../middleware/authMiddleware.js';

const router = express.Router();

router.use(requireAuth);

router.get('/balance-sheet', balanceSheetController.getBalanceSheet);
router.get('/profit-loss', profitLossController.getProfitLoss);

export default router;
