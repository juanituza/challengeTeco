import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";


import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import usersRouter from "./routes/users.router.js";
import viewsRouter from "./routes/views.router.js";


import __dirname from "./utils.js";
import registerChathandler from "./listeners/chatHandler.js";
import { Server } from "socket.io";
import socketProducts from './products.socket.js';
import socketCarts from './cart.socket.js';

const app = express();
const connection = mongoose.connect('mongodb+srv://juanituza:123@cluster0mckenna.x71myop.mongodb.net/Ecommerce?retryWrites=true&w=majority');
const PORT = process.env.PORT || 8080;

//Server de escucha
const server = app.listen(PORT, () => { console.log(`Listening on ${PORT}`) });


const io = new Server(server);
// const cart = new Server(server);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use((req, res, next) => {
    req.io = io;
    next();
});


app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);


io.on('connection',socket =>{
    registerChathandler(io,socket);
})
// io.on('connection', async socket => {
//     console.log('cart conexion');
// });

socketProducts(io);
socketCarts(io);




