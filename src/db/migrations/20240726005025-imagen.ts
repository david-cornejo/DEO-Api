import { QueryInterface, DataTypes } from 'sequelize';
import { IMAGEN_TABLE } from '../models/imagenModel';

export = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable(IMAGEN_TABLE, {
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
          model: 'noticias',
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
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(IMAGEN_TABLE);
  },
};
