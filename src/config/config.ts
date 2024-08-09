import dotenv from 'dotenv';

dotenv.config();

const config = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret',
    emailPass: process.env.EMAIL_PASS,
    email: process.env.EMAIL,
    hostEmail: process.env.HOST_EMAIL,
    dialect: 'postgres',
};

export default config;
