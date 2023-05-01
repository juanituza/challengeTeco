import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils.js";


const app = express();
const PORT = process.env.PORT || 8080;
//Server de escucha
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = new Server(server);

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Objetos codificados desde URL
app.use(express.static(`${__dirname}/public`));
app.use((req,res,next)=>{
    req.io =io;
    next();
})
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

 

//on escucha eventos
io.on('connection', socket => {
    console.log('Socket conexion');
});
