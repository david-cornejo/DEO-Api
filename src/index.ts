import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno PRIMERO
dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('[index.ts] Variables de entorno cargadas:');
console.log('  COOKIE_DOMAIN:', process.env.COOKIE_DOMAIN);
console.log('  NODE_ENV:', process.env.NODE_ENV);
console.log('  DB_HOST:', process.env.DB_HOST ? '✓ definido' : '✗ undefined');

import express from "express";
import cors from "cors";
import https from "https"; // Agregar esta importación
import noticiaRoutes from "./routes/noticiaRoutes";
import imagenRoutes from "./routes/imagenRoutes";
import vacanteRoutes from "./routes/vacanteRoutes";
import usuarioRoutes from "./routes/usuarioRoutes";
import authRoutes from "./routes/authRoutes";
import contactoRoutes from "./routes/contactoRoutes";
import catalogoRoutes from "./routes/catalogoRoutes";
import sequelize from "./config/database";
import bodyParser from "body-parser";
import fs from "fs";

const setupModels = require("./db/models");

//Produccion

const app = express();
const PORT = process.env.PORT || 3003;

const corsOptions = {
  origin: [
    'https://www.sm8.com.mx',
    'https://sm8.com.mx',
    // Agrega otros subdominios que necesites
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Necesario para cookies cross-origin
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const httpsOptions = {
  key: fs.readFileSync('./src/certs/privkey.pem'), // Ruta corregida
  cert: fs.readFileSync('./src/certs/fullchain.pem'), // Ruta corregida
};

app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/noticias', noticiaRoutes);
app.use('/api/imagenes', imagenRoutes);
app.use('/api/vacantes', vacanteRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes);
app.use("/api", contactoRoutes);
app.use('/api/catalogo', catalogoRoutes);

setupModels(sequelize);

sequelize.authenticate().then(() => {
  https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`HTTPS Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});

// Desarrollo|

// const app = express();
// const PORT = process.env.PORT || 3001;

// const corsOptions = {
//   origin: "http://localhost:3000", // Cambia esto al origen de tu frontend
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true, // Permite cookies y headers de autenticación
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions));

// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// app.use("/api/noticias", noticiaRoutes);
// app.use("/api/imagenes", imagenRoutes);
// app.use("/api/vacantes", vacanteRoutes);
// app.use("/api/usuarios", usuarioRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api", contactoRoutes);
// app.use("/api/catalogo", catalogoRoutes);

// setupModels(sequelize);

// sequelize
//   .authenticate()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//   });
  
