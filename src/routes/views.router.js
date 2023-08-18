// import { Router } from "express";
import BaseRouter from "./baseRouter.js";
import { passportCall } from "../utils.js";
import viewController from "../controllers/viewController.js";

/*-----------RENDER CON MONGO---------*/

export default class ViewsRouter extends BaseRouter {
  init() {
    this.get("/", ["PUBLIC"], viewController.homeView);
    this.get(
      "/products",
      ["PUBLIC"],
      passportCall("jwt", { strategyType: "jwt" }, { redirect: "/login" }),
      viewController.productsView
    );
    this.get(
      "/carts",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.cartsView
    );

    this.get(
      "/cartsID",
      ["USER", "PREMIUM"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.cartsViewId
    );
    this.get(
      "/ticketId",
      ["USER"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.ticketViewId
    );

    this.get("/register", ["NO_AUTH"], (req, res) => {
      res.render("register");
    });
    this.get("/login", ["NO_AUTH"], (req, res) => {
      res.render("login");
    });
    this.get("/restoreRequest", ["PUBLIC"], viewController.restoreRequest);
    this.get("/restorePassword", ["PUBLIC"], viewController.restorePassword );

    /*---------REAL TIME--------*/

    this.get("/realtimeproducts", ["PUBLIC"], async (req, res) => {
      res.render("realTimeProducts");
    });

    this.get("/realtimecart", async (req, res) => {
      res.render("realTimeCarts");
    });

    this.get("/chat", ["USER"], async (req, res) => {
      res.render("chat");
    });
  }
}
