
import { cartService, ticketService } from "../services/repositories/index.js";
import ProdModel from "../dao/Mongo/models/products.js";

const homeView = async (req, res) => {
  const userData = req.user;
  res.render("home", { user: userData });
};
const productsView = async (req, res) => {
  const { page = 1 } = req.query;
  const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } =
    await ProdModel.paginate({}, { page, limit: 10, lean: true });
  const products = docs;

  const userData = req.user;

  const addProductId = cartService.addProduct;
  console.log(addProductId);
  // const userData = new UserDTO(req.user);
  // console.log(userData);
  res.render("products", {
    allProducts: products,
    page: rest.page,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    user: userData,
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

  const cartSelected = carts.find((cart) => cart._id.toString() === userCart);
  res.render("cartUser", {
    cartSelected,
    css: "cart",
    user: userData,
  });
};
const ticketViewId = async (req, res) => {
  const userData = req.user;
  const userCart = req.user.email;
  const tickets = await ticketService.getTicket();
  const ticketSelected = tickets.filter(
    (ticket) => ticket.purchaser === userCart
  );
  res.render("ticket", {
    ticket: ticketSelected,
    user: userData,
  });
};


const restoreRequest = async (req, res) => {
  res.render("restoreRequest");
};

const restorePassword = async (req, res) => {
    const userData = req.user;
    // console.log(restoreToken);
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
};
