import { Sequelize } from 'sequelize';
import sequelize from '../../config/database';
import Noticia from './noticia';
import Imagen from './imagen';
import Vacante from './vacante';
import Usuario from './usuario';

const db: {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  Noticia: typeof Noticia;
  Imagen: typeof Imagen;
  Vacante: typeof Vacante;
  Usuario: typeof Usuario;
} = {
  sequelize,
  Sequelize,
  Noticia,
  Imagen,
  Vacante,
  Usuario,
};

// Definir relaciones
Noticia.hasOne(Imagen, { foreignKey: 'id_noticia' });
Imagen.belongsTo(Noticia, { foreignKey: 'id_noticia' });

export default db;
