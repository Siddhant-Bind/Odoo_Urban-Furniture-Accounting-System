import { Router } from 'express';
import { createUser, login, signup } from './auth.controller.js';
import requireAuth from '../../middleware/authMiddleware.js';
import requireRole from '../../middleware/roleMiddleware.js';
const router = Router();
router.post('/signup', signup);
router.post('/login', login);
router.post('/create-user', requireAuth, requireRole('ADMIN'), createUser);
export default router;
