import { Request, Response } from 'express';
import { Imagen } from '../db/models/imagenModel';

export const getImagen = async (req: Request, res: Response) => {
  const { id } = req.params;
  const imagen = await Imagen.findOne({ where: { id: Number(id) } });
  if (imagen) {
    res.json(imagen);
  } else {
    res.status(404).json({ message: 'Imagen not found' });
  }
};

export const createImagen = async (req: Request, res: Response) => {
  const newImagen = await Imagen.create(req.body);
  res.status(201).json(newImagen);
};

export const updateImagen = async (req: Request, res: Response) => {
  const { id } = req.params;
  const [updated] = await Imagen.update(req.body, { where: { id: Number(id) } });
  if (updated) {
    const updatedImagen = await Imagen.findOne({ where: { id: Number(id) } });
    res.status(200).json(updatedImagen);
  } else {
    res.status(404).json({ message: 'Imagen not found' });
  }
};

export const deleteImagen = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await Imagen.destroy({ where: { id: Number(id) } });
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Imagen not found' });
  }
};
