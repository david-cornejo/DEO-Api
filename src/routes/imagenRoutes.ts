import { Router } from 'express';
import { getImagen, createImagen, updateImagen, deleteImagen } from '../service/imagenService';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/:id', getImagen);
router.post('/', authMiddleware, createImagen);
router.put('/:id', authMiddleware, updateImagen);
router.delete('/:id', authMiddleware, deleteImagen);

export default router;
