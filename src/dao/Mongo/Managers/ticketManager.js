import ticketsModel from "../models/ticket.js";
import { productService, cartService } from "../../../services/repositories/index.js";





export default class TicketManager {
    getTicket = async () =>{
        return await ticketsModel.find();
    };

    createTicket = async (cart) =>{
        const cartId = await cartService.getCartsBy(cart);
        console.log(cartId);
        const pid = cartId.products._id;
        const prod = await productService.getProducts(pid)


    



        return await ticketsModel.create(cart);
    };






};