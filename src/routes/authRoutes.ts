import { Router } from 'express';
import { sendRecovery, changePassword, logout, login } from '../service/authService';

const router = Router();

router.post('/login', login);
router.post('/recovery', sendRecovery);
router.post('/change-password', changePassword);
router.post('/logout', logout);

export default router;