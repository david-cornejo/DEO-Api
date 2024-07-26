import { QueryInterface, DataTypes } from 'sequelize';
import { NOTICIA_TABLE } from '../models/noticiaModel';

export = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable(NOTICIA_TABLE, {
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
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(NOTICIA_TABLE);
  },
};
