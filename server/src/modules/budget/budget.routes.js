import express from 'express';
import * as analyticAccountController from './analyticAccount.controller.js';
import * as budgetController from './budget.controller.js';
import requireAuth from '../../middleware/authMiddleware.js';

const router = express.Router();

router.use(requireAuth);

// Analytic Accounts
router.post('/analytic-accounts', analyticAccountController.createAnalyticAccount);
router.get('/analytic-accounts', analyticAccountController.getAnalyticAccounts);
router.get('/analytic-accounts/:id', analyticAccountController.getAnalyticAccountById);
router.put('/analytic-accounts/:id', analyticAccountController.updateAnalyticAccount);

// Budgets
router.post('/', budgetController.createBudget);
router.get('/', budgetController.getBudgets);
router.post('/:id/confirm', budgetController.confirmBudget);
router.post('/:id/revise', budgetController.reviseBudget);
router.post('/:id/cancel', budgetController.cancelBudget);

export default router;
