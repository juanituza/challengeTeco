import BaseRouter from "./baseRouter.js";
import { passportCall } from "../utils.js";
import loggerController from "../controllers/loggerController.js"

export default class LoggerRouter extends BaseRouter {
  init() {
    this.get(
      "/loggerTest",loggerController.createLogger);
  }
}

