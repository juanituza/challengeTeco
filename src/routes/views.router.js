// import { Router } from "express";
import BaseRouter from "./baseRouter.js";

import { authRoles } from "../middlewares/auth.js";
import { passportCall } from "../utils.js";



// import productsModel from "..../dao/Mongo/Manmodelsagers/ProductManager.js";
import cartsModel from "../dao/Mongo/Managers/cartManager.js"
import ProdModel from '../dao/Mongo/models/products.js';


import UserDTO from "../dto/users/UserDTO.js";

// import userManager from '../dao/Mongo/Managers/Mongo/userManager.js';






const cm = new cartsModel();



/*-----------RENDER CON MONGO---------*/

export default class ViewsRouter extends BaseRouter {
  init() {

    this.get("/", ["PUBLIC"], async (req, res) => {

      res.render("home")
    });
    this.get("/products", ["PUBLIC"], passportCall('jwt', { strategyType: "jwt" },{ redirect: "/login" }), async (req, res) => {
      const { page = 1 } = req.query;
      const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } = await ProdModel.paginate({}, { page, limit: 10, lean: true })
      const products = docs;
      const userData = req.user;
      // const userData = new UserDTO(req.user);
      // console.log(userData);
      res.render("products", { allProducts: products, page: rest.page, hasPrevPage, hasNextPage, prevPage, nextPage, user: userData });
    });

    this.get("/carts", ["ADMIN", "USER"], passportCall('jwt', { strategyType: "jwt" }), async (req, res) => {
      const carts = await cm.getCarts();
      res.render("carts", { allCarts: carts })
    });

    this.get("/register", ["PUBLIC"],(req, res) => {
      res.render('register');
    })
    this.get("/login", ["PUBLIC"], (req, res) => {
      res.render('login');
    })
    this.get('/profile', ["ADMIN", "USER"], passportCall('jwt', { strategyType: "jwt" }), (req, res) => {

      res.render('profile', { user: req.user })
    })


    this.get("/restorePassword",["PUBLIC"], (req, res) => {
      res.render('restorePassword');
    })








    /*---------REAL TIME--------*/


    this.get("/realtimeproducts", ["PUBLIC"], async (req, res) => {

      res.render("realTimeProducts");
    });



    this.get("/realtimecart", async (req, res) => {

      res.render("realTimeCarts");
    });

    this.get('/chat', ["USER"], async (req, res) => {
      res.render('chat');
    })

  }
}

