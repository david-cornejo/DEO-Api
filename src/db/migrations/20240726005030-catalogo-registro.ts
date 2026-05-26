import { QueryInterface, DataTypes } from 'sequelize';
import { CATALOGO_REGISTRO_TABLE } from '../models/catalogoRegistroModel';

export = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable(CATALOGO_REGISTRO_TABLE, {
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
      user_agent: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(CATALOGO_REGISTRO_TABLE);
  },
};
