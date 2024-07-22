import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class Vacante extends Model {
  public id!: number;
  public nombre!: string;
  public sucursal!: string;
}

Vacante.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sucursal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'vacantes',
});

export default Vacante;
