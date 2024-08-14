import { Request, Response } from 'express';
import { Imagen } from '../db/models/imagenModel';

export const getImagen = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const imagen = await Imagen.findOne({ where: { id: Number(id) } });

    if (!imagen) {
      return res.status(404).json({ message: 'Imagen not found' });
    }

    res.set('Content-Type', 'image/jpg' || 'image/png' || 'image/jpeg' || 'image/webp');
    res.send(imagen.imagen);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la imagen', error });
  }
};

export const createImagen = async (req: Request, res: Response) => {
  const { id_noticia, imagen } = req.body;
  try {
    const newImagen = await Imagen.create({ id_noticia, imagen });
    res.status(201).json(newImagen);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la imagen', error });
  }
};

export const updateImagen = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updated] = await Imagen.update(req.body, { where: { id: Number(id) } });

    if (updated) {
      const updatedImagen = await Imagen.findOne({ where: { id: Number(id) } });
      res.status(200).json(updatedImagen);
    } else {
      res.status(404).json({ message: 'Imagen not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la imagen', error });
  }
};

export const deleteImagen = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Imagen.destroy({ where: { id: Number(id) } });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Imagen not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la imagen', error });
  }
};
