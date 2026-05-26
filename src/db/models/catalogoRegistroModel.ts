import { Model, DataTypes, Sequelize } from 'sequelize';

const CATALOGO_REGISTRO_TABLE = 'catalogo_registros';

const CatalogoRegistroSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  tipo: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  ip: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  pais: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  region: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ciudad: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  userAgent: {
    allowNull: true,
    field: 'user_agent',
    type: DataTypes.TEXT,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

class CatalogoRegistro extends Model {
  public id!: number;
  public tipo!: string;
  public ip!: string | null;
  public pais!: string | null;
  public region!: string | null;
  public ciudad!: string | null;
  public userAgent!: string | null;
  public createdAt!: Date;

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: CATALOGO_REGISTRO_TABLE,
      modelName: 'CatalogoRegistro',
      timestamps: false,
    };
  }
}

export { CATALOGO_REGISTRO_TABLE, CatalogoRegistroSchema, CatalogoRegistro };
