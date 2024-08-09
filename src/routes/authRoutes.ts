import { Router } from 'express';
import { sendRecovery, changePassword } from '../service/authService';

const router = Router();

router.post('/recovery', sendRecovery);
router.post('/change-password', changePassword);

export default router;