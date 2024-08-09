import { QueryInterface, DataTypes } from 'sequelize';
import { USUARIO_TABLE } from '../models/usuarioModel';

export = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable(USUARIO_TABLE, {
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
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(USUARIO_TABLE);
  },
};
