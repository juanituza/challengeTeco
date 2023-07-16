import ProductManager from "../dao/Mongo/Managers/ProductManager.js";
import ProductService from "./products.service.js";

import CartManager from "../dao/Mongo/Managers/cartManager.js";
import CartService from "./carts.service.js";

import UsersManager from "../dao/Mongo/Managers/userManager.js";
import UsersService from "./users.service.js";

export const productService = new ProductService(new ProductManager());
export const cartService = new CartService(new CartManager());
export const usersService = new UsersService(new UsersManager());

