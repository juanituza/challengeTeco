import CartManager from "./dao/FileSystem/CartManager.js";


const cm = new CartManager();


export default function socketCarts(io) {
    io.on('connection', async socket => {
        console.log('Socket cart conexion');
        const carts = await cm.getCarts();
        socket.emit("homeCart", carts)

    });
}