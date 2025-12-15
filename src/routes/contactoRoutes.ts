import { Router } from "express";
import { enviarCorreo } from "../service/contactoService";

const router = Router();

router.post("/enviar-correo", enviarCorreo);

export default router;
