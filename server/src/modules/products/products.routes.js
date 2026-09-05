import express from 'express';
import * as productsController from './products.controller.js';
import requireAuth from '../../middleware/authMiddleware.js';

const router = express.Router();

router.use(requireAuth);

router.post('/', productsController.createProduct);
router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);
router.put('/:id', productsController.updateProduct);

export default router;
