import express from "express";
import path from 'path';

import cookieParser from "cookie-parser";
import config from "./config.js";
import cors from 'cors';

import MySQLSingleton  from "./MySQLSingleton.js";

import UserRouter from "./routes/users.router.js";
import SesionesRutas from "./routes/sesiones.router.js";

import __dirname from "./utils.js";

import initializePassportStrategies from "../config/passport.config.js";
import LoggerService from "./dao/MySql/Managers/LoggerManager.js";


// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

const app = express();

const PORT = config.app.PORT;

MySQLSingleton.getInstance();


// Configurar CORS para permitir solicitudes desde localhost:5173
app.use(cors({
  origin: 'http://localhost:5173', //URL y puerto del frontend
  credentials: true, // si usás cookies o autenticación que requiere credenciales
}));


//Server de escucha
const server = app.listen(PORT, () =>
  LoggerService.info(`Listening on ${PORT}`)
);

//Initializar las estrategias de Passport
initializePassportStrategies();





app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar el directorio estático para servir archivos del frontend
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));


//Configurar las rutas de la API
const userRouter = new UserRouter();
const sesionesRutas = new SesionesRutas();


app.use("/api/users", userRouter.getRouter());
app.use("/api/sesiones", sesionesRutas.getRouter());




