import express from "express";
import path from 'path';

import cookieParser from "cookie-parser";
import config from "./config.js";
import cors from 'cors';

import MySQLSingleton  from "./MySQLSingleton.js";

import UserRouter from "./routes/users.router.js";
import SesionesRutas from "./routes/sesiones.router.js";

import __dirname from "./middlewares/utils.js";

import initializePassportStrategies from "./config/passport.config.js";
import LoggerService from "./dao/MySql/Managers/LoggerManager.js";



// Creamos la aplicación Express
const app = express();
// Definimos el puerto desde archivo de configuración
const PORT = config.app.PORT;
// Inicializamos la conexión a la base de datos usando Singleton (una sola instancia global)
MySQLSingleton.obtenerInstancia();


// Habilitamos CORS para permitir solicitudes desde el frontend (en este caso, Vite en localhost:5173)
app.use(cors({
  origin: 'http://localhost:5173', //URL y puerto del frontend
  credentials: true, // si usás cookies o autenticación que requiere credenciales
}));


// Iniciamos el servidor y lo hacemos escuchar en el puerto configurado
const server = app.listen(PORT, () =>
  LoggerService.info(`Escuchando en ${PORT}`)
);
//Initializar las estrategias de Passport
initializePassportStrategies();

// Middlewares globales para parsing de cookies, JSON y formularios
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar el directorio estático para servir archivos del frontend
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));


// Instanciamos los routers de usuarios y sesiones
const userRouter = new UserRouter();
const sesionesRutas = new SesionesRutas();

// Montamos las rutas correspondiente
app.use("/api/usuarios", userRouter.getRouter());
app.use("/api/sesiones", sesionesRutas.getRouter());




