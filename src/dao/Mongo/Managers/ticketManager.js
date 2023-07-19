import ticketsModel from "../models/ticket.js";
import { productService, cartService } from "../../../services/repositories/index.js";





export default class TicketManager {
  getTicket = async () => {
       
            return ticketsModel.find().lean();
        } 
    

    // Método para crear un nuevo ticket 
    createTicket= async (ticketData) => {
       
           
            return await ticketsModel.create(ticketData);
        } 
   






};