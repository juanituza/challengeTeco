import cartsModel from "../models/carts.js";
import productModel from "../models/products.js";
import {
  productMockService,
  productService,
} from "../../../services/repositories/index.js";

import {
  insufficientStock,
  emptyCart,
  cartNotFound,
} from "../../../constants/cartError.js";
import ErrorService from "../../../services/ErrorServicer.js";
import EErrors from "../../../constants/EErrors.js";

export default class CartManager {
  getCarts = async () => {
    return await cartsModel.find().lean();
  };
  getCartsBy = async (cid) => {
    return await cartsModel.findById(cid);
  };

  createCart = async () => {
    return await cartsModel.create({ products: [] });
  };

  addProduct = async (cid, pid) => {
    //obtengo el producto para agregar
    const prod = await productService.getProductsBy(pid);
    
    //obtengo el carrito
    const cart = await this.getCartsBy(cid);
    if (!cart) {
      return ErrorService.createError({
        name: "Cart Not Found",
        cause: cartNotFound(cid),
        message: `Cart Not Found`,
        code: EErrors.CART_NOT_FOUND,
        status: 500,
      });
    }
    // verifico si el producto es nuevo
    const existingProduct = cart.products.find(
      ({ product }) => product._id.toString() === pid
    );

    // si el producto es undefined lo agrego al arreglo products
    if (existingProduct === undefined) {
      cart.products.push({ product: prod, quantity: 1 });

      //si el producto existe agrego cantidad
    } else {
      existingProduct.quantity += 1;
    }
    // guardo el carrito
    await cartsModel.updateOne({ _id: cid }, { $set: cart });
    return cart;
  };

  //Método para verificar la compra
  purchaseCart = async (cid) => {
    const cart = await this.getCartsBy(cid);

    // verifico si el carrito tiene productos
    for (const item of cart.products) {
      // Si no hay suficiente stock, en el carrito, arroja error
      if (item.quantity > item.product.stock) {
        return ErrorService.createError({
          name: "Insufficient stock",
          cause: insufficientStock(item.product),
          message: `product ${item.product.title} ${item.product.description} with insufficient stock`,
          code: EErrors.INSUFFICIENT_STOCK,
          status: 500,
        });
      }
    }
    for (const item of cart.products) {
      //Si hay stock del producto le resto la cantidad
      const newStock = (item.product.stock -= item.quantity);
      //edito el producto en la DB
      await productModel.updateOne(
        { _id: item.product._id },
        { $set: { stock: newStock } }
      );
    }
    await cartsModel.updateOne({ _id: cid }, { $set: cart });

    return cart;
    //edito el cart en la DB
  };
  //Método para vaciar de productos el carrito
  emptycart = async (cid) => {
    try {
      // Obtener el carrito actual desde la base de datos
      const carrito = await this.getCartsBy(cid);
      // Verificar si se encontró el carrito
      if (!carrito) {
        throw new Error("Carrito no encontrado");
      }
      //Vaciar el array de productos
      carrito.products = [];
      // Guardar los cambios en la base de datos
      await cartsModel.updateOne({ _id: cid }, { $set: carrito });
      return carrito;
    } catch (error) {
      // Manejar errores aquí
      console.error("Error al vaciar el carrito:", error);
    }
  };

  deleteCart = (cart) => {
    return cartsModel.findByIdAndDelete(cart);
  };
}
