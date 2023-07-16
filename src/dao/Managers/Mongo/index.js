import UsersManager from "./userManager.js";
import ProductManager from "./ProductManager.js"
import CartManager from "./cartManager.js"

export const productService = new ProductManager();
export const usersService = new UsersManager();
export const cartService = new CartManager();