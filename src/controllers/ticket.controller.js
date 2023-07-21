import { ticketService, cartService } from "../services/repositories/index.js";
import { v4 as uuidv4 } from "uuid";
import TicketDTO from "../dto/ticketDTO.js";
import { emptyCart } from "../constants/cartError.js";
import ErrorService from "../services/ErrorServicer.js";
import EErrors from "../constants/EErrors.js";



const getTicket = async (req, res) => {
  try {
    const ticket = await ticketService.getTicket();
    const ticketParser = ticket.map((ticket) => new TicketDTO(ticket));
    res.sendSuccessWithPayload(ticketParser);
  } catch (error) {
    res.sendInternalError("Internal server error, contact the administrator");
  }
};
const createTickets = async (req, res) => {
  try {
    //obtengo el id del carrito
    const cid = req.user.cart;
    //  obtengo el carrito del cliente
    const cart = await cartService.getCartsBy(cid);
    // obtengo el total del precio del carrito
    const totalAmount = cart.products.reduce((total, item) => {
      // Multiplicar la cantidad del producto por el precio del producto y sumarlo al total
      return total + item.quantity * item.product.price;
    }, 0);
    // defino el ticket
    const ticketData = {
      code: uuidv4(), // Asigna el código apropiado o genera uno único
      amount: totalAmount, // Incluir el total del precio de los productos
      purchaser: req.user.email, // Asigna el ID del comprador
      products: cart.products,
    };
    
    if (ticketData.products.length === 0) {
      return ErrorService.createError({
        name: "Empty product cart",
        cause: emptyCart(ticketData.products),
        message: `Empty product cart`,
        code: EErrors.CART_EMPTY,
        status: 500,
      })

    }
    // creo el ticket
    
    if (ticketData) {
      await cartService.purchaseCart(cid); //si existe el ticket descuento el stock del producto y verifico si hay stock suficiente
      await cartService.emptycart(cid); // vacio el carrito
      await ticketService.createTicket(ticketData);
    }

    res.sendSuccess("Ticket generated");
  } catch (error) {
    console.log(error); 
    if (error.name === "Insufficient stock") {
    
    res.status(error.status).send({ status: "error", error: error.message });
      }
      else
      if (error.name === "Empty product cart") {
      res.status(error.status).send({ status: "error", error: error.message });
      
    }else{
      return res.sendNotFound("Ticket not created");
      // res.sendInternalError("Internal server error,contact the administrator");
    }
  };
};


export default { getTicket, createTickets };
