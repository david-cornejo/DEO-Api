import { Request, Response } from 'express';
import { Usuario } from '../db/models/usuarioModel';
import { hashPassword, verifyPassword } from '../utils/auth/pass-hash';
import { signToken } from '../utils/auth/token-sign';

export const getUsuarios = async (req: Request, res: Response) => {
  const usuariosList = await Usuario.findAll();
  res.json(usuariosList);
};

export const registerUsuario = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashedPassword = await hashPassword(password);
  const newUsuario = await Usuario.create({ email, password: hashedPassword });
  res.status(201).json(newUsuario);
};

export const loginUsuario = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ where: { email } }) as Usuario | null;

  if (!usuario) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isPasswordValid = await verifyPassword(password, usuario.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = signToken({ id: usuario.id, email: usuario.email });
  res.status(200).json({ token });
};

export const updateUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const [updated] = await Usuario.update(req.body, { where: { id: Number(id) } });
  if (updated) {
    const updatedUsuario = await Usuario.findOne({ where: { id: Number(id) } });
    res.status(200).json(updatedUsuario);
  } else {
    res.status(404).json({ message: 'Usuario not found' });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await Usuario.destroy({ where: { id: Number(id) } });
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Usuario not found' });
  } 
};

export const buscarEmail = async (email: string): Promise<Usuario | null> => {
  return await Usuario.findOne({ where: { email: email } });
};

export const buscarUno = async (id: number): Promise<Usuario | null> => {
  return await Usuario.findOne({ where: { id: id } });
};

export const actualizar = async (id: number, changes: Partial<Usuario>): Promise<[affectedCount: number]> => {
  
  const response = await Usuario.update(changes, { where: { id: id } }); 
  return response;
  
};
