import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class News extends Model {
  public id!: number;
  public resumen!: string;
  public categoria!: string;
  public fecha!: Date;
  public titulo!: string;
  public contenido!: string;
}

News.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  resumen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'noticias',
});

export default News;
