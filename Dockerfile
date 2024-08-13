# Usa la imagen oficial de Node.js
FROM node:18.20.3

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de tu proyecto al contenedor
COPY . .

# Instala las dependencias
RUN npm install

# Exponer el puerto en el que correrá la aplicación (ajusta según tu configuración)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
