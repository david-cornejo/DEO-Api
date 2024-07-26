import { Router } from 'express';
import { getNoticias, createNoticia, updateNoticia, deleteNoticia } from '../service/noticiaService';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getNoticias);
router.post('/', authMiddleware, createNoticia);
router.put('/:id', authMiddleware, updateNoticia);
router.delete('/:id', authMiddleware, deleteNoticia);

export default router;
