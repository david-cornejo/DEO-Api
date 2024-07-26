import { Request, Response } from 'express';
import { Vacante } from '../db/models/vacanteModel';

export const getVacantes = async (req: Request, res: Response) => {
  const vacantesList = await Vacante.findAll();
  res.json(vacantesList);
};

export const createVacante = async (req: Request, res: Response) => {
  const newVacante = await Vacante.create(req.body);
  res.status(201).json(newVacante);
};

export const updateVacante = async (req: Request, res: Response) => {
  const { id } = req.params;
  const [updated] = await Vacante.update(req.body, { where: { id: Number(id) } });
  if (updated) {
    const updatedVacante = await Vacante.findOne({ where: { id: Number(id) } });
    res.status(200).json(updatedVacante);
  } else {
    res.status(404).json({ message: 'Vacante not found' });
  }
};

export const deleteVacante = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await Vacante.destroy({ where: { id: Number(id) } });
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Vacante not found' });
  }
};
