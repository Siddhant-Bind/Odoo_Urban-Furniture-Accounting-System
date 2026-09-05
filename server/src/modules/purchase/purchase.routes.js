import express from 'express';
import * as purchaseOrderController from './purchaseOrder.controller.js';
import * as vendorBillController from './vendorBill.controller.js';
import * as billPaymentController from './billPayment.controller.js';
import requireAuth from '../../middleware/authMiddleware.js';

const router = express.Router();

router.use(requireAuth);

// Purchase Orders
router.post('/orders', purchaseOrderController.createPO);
router.get('/orders', purchaseOrderController.getPOs);
router.get('/orders/:id', purchaseOrderController.getPOById);
router.post('/orders/:id/confirm', purchaseOrderController.confirmPO);

// Vendor Bills
router.post('/bills', vendorBillController.createVendorBill);
router.get('/bills', vendorBillController.getVendorBills);
router.get('/bills/:id', vendorBillController.getVendorBillById);
router.post('/bills/:id/confirm', vendorBillController.confirmVendorBill);

// Payments
router.post('/bills/:id/pay', billPaymentController.payBill);

export default router;
