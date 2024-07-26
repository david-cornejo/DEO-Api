import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../config/database';

const VACANTE_TABLE = 'vacantes';

const VacanteSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  sucursal: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  descripcion: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

class Vacante extends Model {
  public id!: number;
  public nombre!: string;
  public sucursal!: string;
  public descripcion!: string;
  public createdAt!: Date;

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: VACANTE_TABLE,
      modelName: 'Vacante',
      timestamps: false,
    };
  }
}

export { VACANTE_TABLE, VacanteSchema, Vacante };
