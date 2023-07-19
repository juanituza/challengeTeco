import { ticketService, cartService } from "../services/repositories/index.js";
import { v4 as uuidv4 } from "uuid";
import TicketDTO from "../dto/ticketDTO.js";
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
    // creo el ticket
    const ticket = await ticketService.createTicket(ticketData);

    if (ticket) {
      await cartService.purchaseCart(cid); //si existe el ticket descuento el stock del producto y verifico si hay stock suficiente
      await cartService.emptycart(cid); // vacio el carrito
    }

    res.sendSuccess("Ticket generated");
  } catch (error) {
    return res.sendNotFound("Ticket not created");
  }
};

export default { getTicket, createTickets };
