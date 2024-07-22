import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class Usuario extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
}

Usuario.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'usuarios',
});

export default Usuario;
