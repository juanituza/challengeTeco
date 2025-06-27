import BaseRouter from "./baseRouter.js";
import { passportCall } from "../utils.js";
import sessionsController from "../controllers/sessionsController.js";
export default class SessionRouter extends BaseRouter {
  init() {
    this.post(
      "/register",
      ["PUBLIC"],
      passportCall("register", { strategyType: "locals" }),
      sessionsController.register
    );

    this.post(
      "/login",
      ["PUBLIC"],
      passportCall("login", { strategyType: "locals" }),
      sessionsController.login
    );    

    this.post(
      "/logout",
      ["USER", "PREMIUM", "ADMIN"],
      passportCall("jwt", { strategyType: "locals" }),
      sessionsController.logout
    );
  }
}
