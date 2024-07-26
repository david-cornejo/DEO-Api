import { QueryInterface, DataTypes } from 'sequelize';
import { VACANTE_TABLE } from '../models/vacanteModel';

export = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable(VACANTE_TABLE, {
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
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(VACANTE_TABLE);
  },
};
