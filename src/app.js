import express from "express";
import path from 'path';

import cookieParser from "cookie-parser";
import config from "./config.js";
import attachLogger from "./middlewares/logger.js";


// import PersistenceFactory from "./dao/Factory.js";
import MySQLSingleton  from "./MySQLSingleton.js";
import UserRouter from "./routes/users.router.js";

import SessionRouter from "./routes/sessions.router.js";
import ViewsRouter from "./routes/views.router.js";

import __dirname from "./utils.js";
// import { Server } from "socket.io";

import initializePassportStrategies from "../config/passport.config.js";
import LoggerService from "./dao/MySql/Managers/LoggerManager.js";


// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

const app = express();

const PORT = config.app.PORT;

MySQLSingleton.getInstance();



//Server de escucha
const server = app.listen(PORT, () =>
  LoggerService.info(`Listening on ${PORT}`)
);


initializePassportStrategies();





app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(`${__dirname}/public`));


// const __dirname = path.resolve(); // si usás módulos ES

app.use(express.static(path.join(__dirname, 'frontend', 'dist')));



const userRouter = new UserRouter();
const sessionRouter = new SessionRouter();
const viewsRouter = new ViewsRouter();

app.use("/api/users", userRouter.getRouter());
app.use("/api/sessions", sessionRouter.getRouter());

app.use("/", viewsRouter.getRouter());
