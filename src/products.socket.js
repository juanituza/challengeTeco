// import ProductManager from "./dao/Managers/FileSystem/ProductManager.js";
import productsModel from "./dao/Managers/Mongo/ProductManager.js";



// const pm = new ProductManager();
const pm = new productsModel();



//on escucha eventos



export default function socketProducts(io){
    io.on('connection', async socket => {
        console.log('Socket product conexion');
        const products = await pm.getProducts();
        socket.emit("homeProduct", products)
    });
}

