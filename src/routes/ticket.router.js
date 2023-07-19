import BaseRouter from "./baseRouter.js";
import { passportCall } from "../utils.js";
import ticketController from "../controllers/ticket.controller.js";


export default class TicketRouter extends BaseRouter {
    init(){
        this.get("/",["USER"], passportCall("jwt", { strategyType: 'locals' }), ticketController.getTicket);
        this.post("/create",["USER"], passportCall("jwt", { strategyType: 'locals' }), ticketController.createTickets);
    }




}