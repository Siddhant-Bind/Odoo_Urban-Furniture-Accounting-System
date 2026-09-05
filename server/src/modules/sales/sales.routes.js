import express from 'express';
import * as salesOrderController from './salesOrder.controller.js';
import * as customerInvoiceController from './customerInvoice.controller.js';
import * as invoicePaymentController from './invoicePayment.controller.js';
import requireAuth from '../../middleware/authMiddleware.js';

const router = express.Router();

router.use(requireAuth);

// Sales Orders
router.post('/orders', salesOrderController.createSO);
router.get('/orders', salesOrderController.getSOs);
router.get('/orders/:id', salesOrderController.getSOById);
router.post('/orders/:id/confirm', salesOrderController.confirmSO);

// Customer Invoices
router.post('/invoices', customerInvoiceController.createCustomerInvoice);
router.get('/invoices', customerInvoiceController.getCustomerInvoices);
router.get('/invoices/:id', customerInvoiceController.getCustomerInvoiceById);
router.post('/invoices/:id/confirm', customerInvoiceController.confirmCustomerInvoice);

// Payments
router.post('/invoices/:id/pay', invoicePaymentController.payInvoice);

export default router;
