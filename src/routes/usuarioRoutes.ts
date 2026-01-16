import { Router } from 'express';
import { getUsuarios, registerUsuario, updateUsuario, deleteUsuario } from '../service/usuarioService';

const router = Router();

router.get('/', getUsuarios);
router.post('/register', registerUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

export default router;
