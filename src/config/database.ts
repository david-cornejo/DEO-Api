import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USERNAME!, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
<<<<<<< HEAD
  port: parseInt(process.env.DB_PORT!) || 5432,
=======
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 15432,
>>>>>>> main
  dialect: 'postgres',
});

export default sequelize;
