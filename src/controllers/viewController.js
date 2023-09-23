
import { cartService, ticketService,usersService } from "../services/repositories/index.js";

import ProdModel from "../dao/Mongo/models/products.js";

const homeView = async (req, res) => {
  const userData = req.user;
  const userRole = {
    role: "premium", // Debes obtener el rol del usuario desde tus datos
  };
  res.render("home", { user: userData, userRole });
};

const adminView = async(req,res) => {
  
  const users = await usersService.getUsers();

  res.render("admin", { Users: users });
}

const createProducts = async (req,res) => {
  const userData = req.user;
  const userRole = {
    role: "premium", // Debes obtener el rol del usuario desde tus datos
  };

res.render("createProducts", {
 
  user: userData, userRole
});
}

const productsView = async (req, res) => {
  const { page = 1 } = req.query;
  const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } =
    await ProdModel.paginate({}, { page, limit: 10, lean: true });
  const products = docs;
  const userRole = {
    role: "premium", // Debes obtener el rol del usuario desde tus datos
  };

  const userData = req.user;

  const addProductId = cartService.addProduct;
  
  res.render("products", {
    allProducts: products,
    page: rest.page,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    user: userData,
    userRole,
  });
};

const cartsView = async (req, res) => {
  const carts = await cartService.getCarts();
  res.render("carts", { allCarts: carts });
};

const cartsViewId = async (req, res) => {
  const userData = req.user;
  const userCart = req.user.cart;

  const carts = await cartService.getCarts();
   const userRole = {
     role: "premium", // Debes obtener el rol del usuario desde tus datos
   };

  const cartSelected = carts.find((cart) => cart._id.toString() === userCart);
  
    res.render("cartUser", {
    cartSelected,
    css: "cart",
    user: userData,
    userRole,
    
  });
};

const ticketViewId = async (req, res) => {
  const userData = req.user;
  const userCart = req.user.email;
  const tickets = await ticketService.getTicket();
  const ticketSelected = tickets.filter(
    (ticket) => ticket.purchaser === userCart
  );
  const userRole = {
    role: "premium", // Debes obtener el rol del usuario desde tus datos
  };
  res.render("ticket", {
    ticket: ticketSelected,
    user: userData,
    userRole,
  });
};

const restoreRequest = async (req, res) => {
  res.render("restoreRequest");
};

const restorePassword = async (req, res) => {
    const userData = req.user;
  res.render("restorePassword", {user : userData});
};


export default {
  homeView,
  productsView,
  cartsView,
  cartsViewId,
  ticketViewId,
  restoreRequest,
  restorePassword,
  adminView,
  createProducts,
};
