import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../config/database';

const NOTICIA_TABLE = 'noticias';

const NoticiaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  resumen: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  categoria: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  fecha: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  titulo: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  contenido: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

class Noticia extends Model {
  public id!: number;
  public resumen!: string;
  public categoria!: string;
  public fecha!: Date;
  public titulo!: string;
  public contenido!: string;
  public createdAt!: Date;

  static associate(models: any) {
    this.hasOne(models.Imagen, {
      as: 'imagen',
      foreignKey: 'id_noticia',
    });
  }
  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: NOTICIA_TABLE,
      modelName: 'Noticia',
      timestamps: false,
    };
  }
}

export { NOTICIA_TABLE, NoticiaSchema, Noticia };
