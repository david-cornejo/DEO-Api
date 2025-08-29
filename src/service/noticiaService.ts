import { Request, Response } from "express";
import { Noticia } from "../db/models/noticiaModel";
import { Imagen } from "../db/models/imagenModel";

export const getNoticias = async (req: Request, res: Response) => {
  try {
    const noticias = await Noticia.findAll({
      include: [{ model: Imagen, as: "imagenes" }],
    });

    const noticiasConImagenes = noticias.map((noticia) => {
      const noticiaJSON = noticia.toJSON() as any;

      noticiaJSON.imagenes = noticiaJSON.imagenes.map((imagen: any) => ({
        ...imagen,
        imagen: `${imagen.imagen}`,
      }));

      return noticiaJSON;
    });

    return res.status(200).json(noticiasConImagenes);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener las noticias", error });
  }
};

export const getNoticia = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const noticia = await Noticia.findByPk(id, {
      include: [{ model: Imagen, as: "imagenes" }],
    });

    if (!noticia) {
      return res.status(404).json({ message: "Noticia not found" });
    }

    const noticiaJSON = noticia.toJSON();

    noticiaJSON.imagenes = noticiaJSON.imagenes.map((imagen: any) => ({
      ...imagen,
      imagen: `${imagen.imagen}`,
    }));

    return res.status(200).json(noticiaJSON);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener la noticia", error });
  }
};

export const createNoticia = async (req: Request, res: Response) => {
  const newNoticia = await Noticia.create(req.body);
  res.status(201).json(newNoticia);
};

export const updateNoticia = async (req: Request, res: Response) => {
  const { id } = req.params;
  const [updated] = await Noticia.update(req.body, {
    where: { id: Number(id) },
  });
  if (updated) {
    const updatedNoticia = await Noticia.findOne({ where: { id: Number(id) } });
    res.status(200).json(updatedNoticia);
  } else {
    res.status(404).json({ message: "Noticia not found" });
  }
};

export const deleteNoticia = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await Noticia.destroy({ where: { id: Number(id) } });
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Noticia not found" });
  }
};
