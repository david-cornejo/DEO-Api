import { Router } from 'express';
import { registrarAcceso, getRegistros } from '../service/catalogoService';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/registro/:tipo', registrarAcceso);
router.get('/registros', authMiddleware, getRegistros);

export default router;
