import { ticketService, cartService }  from "../services/repositories/index.js";
import { v4 as uuidv4 } from 'uuid';
const getTicket = async (req, res) => {
    try {
        // const ticket = await ticketService.gettTicket();
        res.sendSuccessWithPayload();
    } catch (error) {
        res.sendInternalError("Internal server error, contact the administrator");
    }
};
const createTickets = async (req, res) => {
    try {
        const cid = req.user.cart;
        const cart = await cartService.getCartsBy(cid);
        const totalAmount = cart.products.reduce((total, item) => {
            // Multiplicar la cantidad del producto por el precio del producto y sumarlo al total
            return total + item.quantity * item.product.price;
        }, 0);
        const ticketData = {
            code: uuidv4(), // Asigna el código apropiado o genera uno único
            amount: totalAmount, // Incluir el total del precio de los productos
            purchaser: req.user.email, // Asigna el ID del comprador            
        };
 
       
        
        const ticket = await ticketService.createTicket(ticketData);
        if(ticket){
            await cartService.purchaseCart(cid);
            await cartService.emptycart(cid);
            
        };
        

        res.send({ status: "success", payload: ticket });
    } catch (error) {
        return res.sendNotFound("Ticket not created");
    }
};


export default { getTicket, createTickets };