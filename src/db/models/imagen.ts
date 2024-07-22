import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class Imagen extends Model {
  public id!: number;
  public imagen!: string;
  public id_noticia!: number;
}

Imagen.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  imagen: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
  id_noticia: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'noticias',
      key: 'id',
    },
  },
}, {
  sequelize,
  tableName: 'imagenes',
});

export default Imagen;

