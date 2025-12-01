import { Request, Response } from 'express';
import { Imagen } from '../db/models/imagenModel';
import FormData from 'form-data';
import axios from 'axios';

export const getImagen = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const imagen = await Imagen.findOne({ where: { id: Number(id) } });

    if (!imagen) {
      return res.status(404).json({ message: 'Imagen not found' });
    }

    // Devolver la URL de la imagen en lugar del blob
    res.status(200).json({ url: imagen.imagen });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la imagen', error });
  }
};

export const createImagen = async (req: Request, res: Response) => {
  const { id_noticia, imagen } = req.body;
  try {
    // Crear FormData para enviar la imagen
    const formData = new FormData();
    
    // Convertir el base64 a Buffer y detectar el tipo de imagen
    let imageBuffer: Buffer;
    let mimeType = 'image/jpeg';
    let extension = 'jpg';
    
    if (typeof imagen === 'string') {
      // Detectar el tipo de imagen del base64
      const mimeMatch = imagen.match(/^data:(image\/\w+);base64,/);
      if (mimeMatch) {
        mimeType = mimeMatch[1];
        extension = mimeType.split('/')[1];
      }
      
      // Remover el prefijo data:image/...;base64,
      const base64Data = imagen.replace(/^data:image\/\w+;base64,/, '');
      imageBuffer = Buffer.from(base64Data, 'base64');
    } else {
      imageBuffer = Buffer.from(imagen);
    }
    
    // Agregar el archivo al FormData
    formData.append('file', imageBuffer, {
      filename: `imagen.${extension}`,
      contentType: mimeType,
    });
    
    // Agregar el idNoticia si existe
    if (id_noticia) {
      formData.append('idNoticia', id_noticia.toString());
    }

    // Enviar la imagen al servicio externo usando axios
    const uploadResponse = await axios.post(`${process.env.IMAGE_SERVICE_URL}/images/upload`, formData, {
      headers: formData.getHeaders(),
    });

    const data = uploadResponse.data;
    
    // Guardar la URL de la imagen en la base de datos
    const imageUrl = data.image.url;
    const newImagen = await Imagen.create({ id_noticia, imagen: imageUrl });
    
    res.status(201).json({
      ...newImagen.toJSON(),
      externalId: data.image.id
    });
  } catch (error) {
    console.error('Error al crear imagen:', error);
    res.status(500).json({ message: 'Error al crear la imagen', error: error instanceof Error ? error.message : error });
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
