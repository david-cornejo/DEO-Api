import { Router } from 'express';
import { getVacantes, createVacante, updateVacante, deleteVacante } from '../service/vacanteService';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getVacantes);
router.post('/', authMiddleware, createVacante);
router.put('/:id', authMiddleware, updateVacante);
router.delete('/:id', authMiddleware, deleteVacante);

export default router;
