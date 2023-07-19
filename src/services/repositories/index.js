// import ProductManager from "../dao/Mongo/Managers/ProductManager.js";
// import PersistenceFactory   from "../dao/Factory.js";

import ProductRepository from "./ProductsRepository.js";
import ProductManager from "../../dao/Mongo/Managers/ProductManager.js";

import CartManager from "../../dao/Mongo/Managers/cartManager.js";
import CartRepository from "./CartRepository.js";

import UsersManager from "../../dao/Mongo/Managers/userManager.js";
import UsersRepository from "./UsersRepository.js";

import TicketManager from "../../dao/Mongo/Managers/ticketManager.js";
import TicketRepository from "./TicketRepository.js";



// Obtén los DAO de la fábrica de persistencia
// const productsDao = await PersistenceFactory.getPersistence();
// const { cartsDao } = await PersistenceFactory.getPersistence();
// const { usersDao } = await PersistenceFactory.getPersistenceUser();


// Crea las instancias de los servicios con los DAO correspondientes
export const productService = new ProductRepository(new ProductManager());
export const cartService = new CartRepository(new CartManager());
export const usersService = new UsersRepository(new UsersManager());
export const ticketService = new TicketRepository(new TicketManager());


