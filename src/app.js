import express from "express";
import cluster from "cluster";
import os from "os";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import config from "./config.js";
import attachLogger from "./middlewares/logger.js";
import winston from "winston";

// import PersistenceFactory from "./dao/Factory.js";
import MongoSingleton from "./mongoSingleton.js";
import UserRouter from "./routes/users.router.js";
import ProductRouter from "./routes/products.router.js";
import CartRouter from "./routes/carts.router.js";
import SessionRouter from "./routes/sessions.router.js";
import TicketRouter from "./routes/ticket.router.js";
import ViewsRouter from "./routes/views.router.js";

import __dirname from "./utils.js";
import registerChathandler from "./listeners/chatHandler.js";
import { Server } from "socket.io";
import socketProducts from "./products.socket.js";
import socketCarts from "./cart.socket.js";
import initializePassportStrategies from "../config/passport.config.js";
import LoggerService from "./dao/Mongo/Managers/LoggerManager.js";

// const cpus = os.cpus().length;

// if (cluster.isPrimary) {
//   LoggerService.info("Parent process, starting workers");
//   for(let i=0;i<cpus;i++){//por cada hilo de la pc
//     cluster.fork();

//   }
// }else{
  //si Primary es false es un worker
  const app = express();
  const PORT = config.app.PORT;

  const connection = MongoSingleton.getInstance();

  // const connection = await PersistenceFactory.getPersistence();

  //Server de escucha
  const server = app.listen(PORT, () =>
    LoggerService.info(`Listening on ${PORT}`)
  );
  const io = new Server(server);

  initializePassportStrategies();

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(`${__dirname}/public`));

  app.engine("handlebars", handlebars.engine());
  app.set("views", `${__dirname}/views`);
  app.set("view engine", "handlebars");

  app.use((req, res, next) => {
    req.io = io;
    next();
  });
  app.use(attachLogger);

  const userRouter = new UserRouter();
  const productRouter = new ProductRouter();
  const cartRouter = new CartRouter();
  const sessionRouter = new SessionRouter();
  const ticketRouter = new TicketRouter();
  const viewsRouter = new ViewsRouter();

  app.use("/api/products", productRouter.getRouter());
  app.use("/api/users", userRouter.getRouter());
  app.use("/api/carts", cartRouter.getRouter());
  app.use("/api/sessions", sessionRouter.getRouter());
  app.use("/api/tickets", ticketRouter.getRouter());

  app.use("/", viewsRouter.getRouter());
  io.on("connection", (socket) => {
    registerChathandler(io, socket);
  });
  // io.on('connection', async socket => {
  //     console.log('cart conexion');
  // });

  socketProducts(io);
  socketCarts(io);
// }


