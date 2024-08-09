import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../config/database';

const USUARIO_TABLE = 'usuarios';

const UsuarioSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  recovery_token: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};

class Usuario extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public createdAt!: Date;
  public recovery_token!: string;

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: USUARIO_TABLE,
      modelName: 'Usuario',
      timestamps: false,      
    };
  }
}

export { USUARIO_TABLE, UsuarioSchema, Usuario };
