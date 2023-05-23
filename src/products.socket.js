import ProductManager from "./dao/Managers/FileSystem/ProductManager.js";



const pm = new ProductManager();


//on escucha eventos



export default function socketProducts(io){
    io.on('connection', async socket => {
        console.log('Socket product conexion');
        const products = await pm.getProducts();
        socket.emit("homeProduct", products)
    });
}

