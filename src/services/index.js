import ProductManager from "../dao/Managers/Mongo/ProductManager.js";
import ProductService from "./products.service.js";

import CartManager from "../dao/Managers/Mongo/cartManager.js";
import CartService from "./carts.service.js";

import UsersManager from "../dao/Managers/Mongo/userManager.js";
import UsersService from "./users.service.js";

export const productService = new ProductService(new ProductManager());
export const cartService = new CartService(new CartManager());
export const usersService = new UsersService(new UsersManager());

