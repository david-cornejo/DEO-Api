const dotenv = require('dotenv');

dotenv.config();

const config = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  emailPass: process.env.EMAIL_PASS,
  email: process.env.EMAIL,
  hostEmail: process.env.HOST_EMAIL,
  apiKey: process.env.API_KEY,
  dialect: 'postgres',
};

module.exports = config;

