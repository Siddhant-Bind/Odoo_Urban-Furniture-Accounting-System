import express from 'express';
import * as contactsController from './contacts.controller.js';
import requireAuth from '../../middleware/authMiddleware.js';
import upload from '../../middleware/uploadMiddleware.js';

const router = express.Router();

router.use(requireAuth);

router.post('/', upload.single('profileImage'), contactsController.createContact);
router.get('/', contactsController.getContacts);
router.get('/me/invoices', contactsController.getMyInvoices);
router.get('/me/bills', contactsController.getMyBills);
router.get('/:id', contactsController.getContactById);
router.put('/:id', upload.single('profileImage'), contactsController.updateContact);

export default router;
