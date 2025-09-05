import express from "express";
import cors from "cors";
import noticiaRoutes from "./routes/noticiaRoutes";
import imagenRoutes from "./routes/imagenRoutes";
import vacanteRoutes from "./routes/vacanteRoutes";
import usuarioRoutes from "./routes/usuarioRoutes";
import authRoutes from "./routes/authRoutes";
import sequelize from "./config/database";
import bodyParser from "body-parser";

const setupModels = require("./db/models");

//Produccion

// const app = express();
// const PORT = process.env.PORT || 3000;

// const corsOptions = {
//   origin: 'http://localhost:5173',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// };

// const httpsOptions = {
//   key: fs.readFileSync('src/config/key.pem'),
//   cert: fs.readFileSync('./certs/'),
// };

// app.use(cors(corsOptions));

// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// app.use('/api/noticias', noticiaRoutes);
// app.use('/api/imagenes', imagenRoutes);
// app.use('/api/vacantes', vacanteRoutes);
// app.use('/api/usuarios', usuarioRoutes);
// app.use('/api/auth', authRoutes);

// setupModels(sequelize);

// sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// }).catch((err) => {
//   console.error('Unable to connect to the database:', err);
// });

// Desarrollo|
const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:3000", // Cambia esto al origen de tu frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/noticias", noticiaRoutes);
app.use("/api/imagenes", imagenRoutes);
app.use("/api/vacantes", vacanteRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/auth", authRoutes);

setupModels(sequelize);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
