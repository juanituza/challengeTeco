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
      "/createProducts",
      ["PREMIUM", "ADMIN"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.createProducts
    );
    this.get(
      "/admin",
      ["ADMIN"],
      passportCall("jwt", { strategyType: "jwt" }, { redirect: "/login" }),
      viewController.adminView
    );

    this.get(
      "/cartsID",
      ["USER", "PREMIUM"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.cartsViewId
    );
    this.get(
      "/ticketId",
      ["USER", "PREMIUM","ADMIN"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.ticketViewId
    );

    this.get("/register", ["NO_AUTH"], (req, res) => {
      res.render("register");
    });
    this.get("/login", ["NO_AUTH"], (req, res) => {
      res.render("login");
    });
    this.get("/changeRol", ["USER", "PREMIUM"], (req, res) => {
      res.render("changeRol");
    });
    this.get(
      "/restoreRequest",
      ["PUBLIC"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.restoreRequest
    );
    this.get(
      "/restorePassword",
      ["PUBLIC"],
      passportCall("jwt", { strategyType: "jwt" }),
      viewController.restorePassword
    );
    
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
