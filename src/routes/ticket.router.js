import BaseRouter from "./baseRouter.js";
import { passportCall } from "../utils.js";
import ticketController from "../controllers/ticket.controller.js";
import LoggerService from "../dao/Mongo/Managers/LoggerManager.js";

export default class TicketRouter extends BaseRouter {
  init() {
    this.get(
      "/",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "locals" }),
      ticketController.getTicket
    );

    this.get(
      "/tid",
      ["USER", "PREMIUM", "ADMIN"],
      passportCall("jwt", { strategyType: "locals" }),
      ticketController.getTicketsById
    );
    this.post(
      "/create",
      ["USER"],
      passportCall("jwt", { strategyType: "locals" }),
      ticketController.createTickets
    );
    

    this.get("/loggerTest",["PUBLIC"] ,async (req, res) => {
         req.log = LoggerService.logger;
        //  LoggerService.debug("DEBUG"),
            req.log.debug("DEBUG"),
              req.log.http("HTTP"),
              req.log.info("INFO"),
              req.log.warning("WARNING"),
              req.log.error("ERROR"),
              req.log.fatal("FATAL");
              res.sendStatus(200);
    })
    
  }
}
