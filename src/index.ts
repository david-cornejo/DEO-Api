import express from 'express';
import noticiaRoutes from './routes/noticiaRoutes';
import imagenRoutes from './routes/imagenRoutes';
import vacanteRoutes from './routes/vacanteRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import sequelize from './config/database';
const setupModels = require('./db/models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/noticias', noticiaRoutes);
app.use('/api/imagenes', imagenRoutes);
app.use('/api/vacantes', vacanteRoutes);
app.use('/api/usuarios', usuarioRoutes);

setupModels(sequelize);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});
