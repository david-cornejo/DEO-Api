import dotenv from 'dotenv';
import path from 'path';

// Cargar .env desde la raíz del proyecto
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 15432,
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret',
    emailPass: process.env.EMAIL_PASS,
    email: process.env.EMAIL,
    hostEmail: process.env.HOST_EMAIL,
    cookieDomain: process.env.COOKIE_DOMAIN || 'localhost',
    dialect: 'postgres',
};

// Log temporal de diagnóstico (puedes quitarlo después)
console.log('[config] COOKIE_DOMAIN cargado:', process.env.COOKIE_DOMAIN);
console.log('[config] NODE_ENV:', process.env.NODE_ENV);

export default config;
