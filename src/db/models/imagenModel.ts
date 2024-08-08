import { Model, DataTypes, Sequelize } from 'sequelize';
import { NOTICIA_TABLE } from './noticiaModel';
import sequelize from '../../config/database';

const IMAGEN_TABLE = 'imagenes';

const ImagenSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  imagen: {
    allowNull: false,
    type: DataTypes.BLOB('long'),
  },
  id_noticia: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: NOTICIA_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

class Imagen extends Model {
  public id!: number;
  public imagen!: Buffer;
  public id_noticia!: number;
  public createdAt!: Date;

  static associate(models: any) {
    this.belongsTo(models.Noticia, {
      as: 'noticia',
      foreignKey: 'id_noticia',
    });
  }
  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: IMAGEN_TABLE,
      modelName: 'Imagen',
      timestamps: false,
    };
  }
}

export { IMAGEN_TABLE, ImagenSchema, Imagen };
