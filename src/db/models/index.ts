const { Noticia, NoticiaSchema } = require('../models/noticiaModel');
const { Imagen, ImagenSchema } = require('../models/imagenModel');
const { Vacante, VacanteSchema } = require('../models/vacanteModel');
const { Usuario, UsuarioSchema } = require('../models/usuarioModel');
const { CatalogoRegistro, CatalogoRegistroSchema } = require('../models/catalogoRegistroModel');

function setupModels(sequelize: any) {
  Noticia.init(NoticiaSchema, Noticia.config(sequelize));
  Imagen.init(ImagenSchema, Imagen.config(sequelize));
  Vacante.init(VacanteSchema, Vacante.config(sequelize));
  Usuario.init(UsuarioSchema, Usuario.config(sequelize));
  CatalogoRegistro.init(CatalogoRegistroSchema, CatalogoRegistro.config(sequelize));

  Noticia.associate(sequelize.models);
  Imagen.associate(sequelize.models);
}

module.exports = setupModels;
