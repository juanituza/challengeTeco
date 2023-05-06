import express from "express";
import handlebars from "express-handlebars";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import ProductManager from "./Managers/ProductManager.js";



const pm = new ProductManager();



const app = express();
const PORT = process.env.PORT || 8080;



//Server de escucha
const server = app.listen(PORT, () => { console.log(`Listening on ${PORT}`) });


const io = new Server(server);


app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Objetos codificados desde URL
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use((req, res, next) => {
    req.io = io;
    next();
});


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);


//on escucha eventos
io.on('connection', async socket => {
    console.log('Socket conexion');
    const products = await pm.getProducts();
    socket.emit("homeProduct", products)
});

