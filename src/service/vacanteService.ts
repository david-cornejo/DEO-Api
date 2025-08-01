import { Request, Response } from 'express';
import { Vacante } from '../db/models/vacanteModel';

// Función helper para mapear la descripción
const mapVacanteResponse = (vacante: any) => {
  let descripcionParsed;
  
  try {
    // Intentar parsear la descripción si es un string JSON
    if (typeof vacante.descripcion === 'string') {
      // Primero intentar parsear como JSON
      try {
        descripcionParsed = JSON.parse(vacante.descripcion);
      } catch {
        // Si no es JSON, convertir texto plano al formato estructurado
        descripcionParsed = convertTextToStructuredFormat(vacante.descripcion);
      }
    } else {
      descripcionParsed = vacante.descripcion;
    }
  } catch (error) {
    // Si hay algún error, mantener como string
    descripcionParsed = vacante.descripcion;
  }

  return {
    ...vacante.toJSON(),
    descripcion: descripcionParsed
  };
};

// Función para convertir texto plano al formato estructurado
const convertTextToStructuredFormat = (text: string) => {
  const sections = [];
  
  // Dividir el texto por las secciones principales
  const lines = text.split('\n').filter(line => line.trim() !== '');
  
  let currentSection = null;
  let currentDescription = [];
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Detectar títulos de secciones
    if (trimmedLine.includes('Lo que necesitas')) {
      if (currentSection) {
        sections.push({
          title: currentSection,
          description: currentDescription.filter(desc => desc.trim() !== '')
        });
      }
      currentSection = "Lo que necesitas:";
      currentDescription = [];
    } else if (trimmedLine.includes('Lo que harías') || trimmedLine.includes('Lo que harias')) {
      if (currentSection) {
        sections.push({
          title: currentSection,
          description: currentDescription.filter(desc => desc.trim() !== '')
        });
      }
      currentSection = "Lo que harías:";
      currentDescription = [];
    } else if (trimmedLine.includes('Lo que tenemos para ti')) {
      if (currentSection) {
        sections.push({
          title: currentSection,
          description: currentDescription.filter(desc => desc.trim() !== '')
        });
      }
      currentSection = "Lo que tenemos para ti:";
      currentDescription = [];
    } else if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-')) {
      // Es un punto de lista
      currentDescription.push(trimmedLine.replace(/^[•\-]\s*/, ''));
    } else if (trimmedLine.length > 0 && !trimmedLine.includes('…')) {
      // Es contenido normal
      currentDescription.push(trimmedLine);
    }
  }
  
  // Agregar la última sección
  if (currentSection && currentDescription.length > 0) {
    sections.push({
      title: currentSection,
      description: currentDescription.filter(desc => desc.trim() !== '')
    });
  }
  
  return sections;
};

export const getVacantes = async (req: Request, res: Response) => {
  const vacantesList = await Vacante.findAll();
  const mappedVacantes = vacantesList.map(vacante => mapVacanteResponse(vacante));
  res.json(mappedVacantes);
};

export const createVacante = async (req: Request, res: Response) => {
  // Convertir la descripción a JSON string si es necesario
  const vacanteData = {
    ...req.body,
    descripcion: typeof req.body.descripcion === 'object' 
      ? JSON.stringify(req.body.descripcion) 
      : req.body.descripcion
  };
  
  const newVacante = await Vacante.create(vacanteData);
  const mappedVacante = mapVacanteResponse(newVacante);
  res.status(201).json(mappedVacante);
};

export const updateVacante = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  // Convertir la descripción a JSON string si es necesario
  const updateData = {
    ...req.body,
    descripcion: typeof req.body.descripcion === 'object' 
      ? JSON.stringify(req.body.descripcion) 
      : req.body.descripcion
  };
  
  const [updated] = await Vacante.update(updateData, { where: { id: Number(id) } });
  if (updated) {
    const updatedVacante = await Vacante.findOne({ where: { id: Number(id) } });
    const mappedVacante = mapVacanteResponse(updatedVacante);
    res.status(200).json(mappedVacante);
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
