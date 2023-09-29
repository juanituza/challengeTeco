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
      "/github",
      ["PUBLIC"],
      passportCall("github", { strategyType: "github" }),
      sessionsController.loginGitHub
    );

    this.get(
      "/githubcallback",
      ["NO_AUTH"],
      passportCall("github", { strategyType: "github" }),
      sessionsController.loginGitHub
    );

    this.post(
      "/logout",
      ["USER", "PREMIUM", "ADMIN"],
      passportCall("jwt", { strategyType: "locals" }),
      sessionsController.logout
    );
    this.post(
      "/restorePassword",
      ["PUBLIC"],
      sessionsController.restorePassword
    );
    this.post(
      "/restoreRequest",
      ["NO_AUTH"],
      sessionsController.restoreRequest
    );
  }
}
