import { Request, Response } from 'express';
import geoip from 'geoip-lite';
import { CatalogoRegistro } from '../db/models/catalogoRegistroModel';

export const registrarAcceso = async (req: Request, res: Response) => {
  try {
    const { tipo } = req.params;

    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
      req.ip ||
      null;

    const userAgent = req.headers['user-agent'] || null;

    let pais: string | null = null;
    let region: string | null = null;
    let ciudad: string | null = null;

    if (ip) {
      const geo = geoip.lookup(ip);
      if (geo) {
        pais = geo.country || null;
        region = geo.region || null;
        ciudad = geo.city || null;
      }
    }

    await CatalogoRegistro.create({ tipo, ip, pais, region, ciudad, userAgent });

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error al registrar acceso a catálogo:', error);
    res.status(500).json({ success: false, message: 'Error al registrar acceso' });
  }
};

export const getRegistros = async (req: Request, res: Response) => {
  try {
    const registros = await CatalogoRegistro.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(registros);
  } catch (error) {
    console.error('Error al obtener registros de catálogo:', error);
    res.status(500).json({ success: false, message: 'Error al obtener registros' });
  }
};
