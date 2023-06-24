import userManager from "./userManager.js";
import ProductManager from "./ProductManager.js"
import cartManager from "./cartManager.js"

export const usersService = new userManager();
export const productService = new ProductManager();
export const cartService = new cartManager();