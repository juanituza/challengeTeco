import cartsModel from "../models/carts.js";
import productModel from "../models/products.js";
import {
  productService,
  usersService,
} from "../../../services/repositories/index.js";
import UsersManager from "./userManager.js";
import userModel from "../models/user.js";
import ticketsModel from "../models/ticket.js";

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
      throw new Error("Carrito no encontrado");
    }
    

    // verifico si el producto es nuevo
    const existingProduct = cart.products.find(
      ( {product} ) => product._id.toString() === pid
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

  

  purchaseCart = async (cid) => {
    // const cartById = await cartsModel.findById(cid);
   
    // const productPassed = [];
    // const productsWithoutStock = [];
    // cartById.products.forEach(({ product, quantity }) => {
    //   if (parseInt(product.stock) < quantity) {
    //     productsWithoutStock.push(product._id);
    //   }
    // });
    // if (productsWithoutStock.length > 0) {      
    //     throw { name: "stockError", products: productsWithoutStock };      
    // }
    
    
    // return cartById;

    // };

  const cart = await this.getCartsBy(cid);
  // const cartCopy = await this.getCartsBy(cid);


  // const prod = await productService.getProductsBy(pid);
  const productsToTicket = []; // Array para almacenar los productos a comprar
  const productsWithoutStock = []; // Array para almacenar los productos sin stock

  for (const item of cart.products) {
    const product = await productService.getProductsBy(item.product._id);

    if (item.quantity <= parseInt(product.stock)) {
      product.stock -= item.quantity;

      await productModel.updateOne(
        { _id: item.product._id },
        { $set: { stock: product.stock } }
      );
      } else {
        // Si no hay suficiente stock, eliminar el producto del carrito
      throw { name: "stockError", error: cart.products};
      cart.products = cart.products.filter(
      (p) => p.product._id.toString() !== item.product._id.toString()
      );
      // cartCopy.products = cartCopy.products.filter(
      //   (p) => p.product._id.toString() === item.product._id.toString()
      // );

          // productsWithoutStock.push(item);

        };

      };
      await cartsModel.updateOne({ _id: cid }, { $set: cart });
      return cart;
  }

  // await ticketsModel.createTicket(cart);

  emptycart = async (cid) => {
    try {
      // Obtener el carrito actual desde la base de datos
      const carrito = await this.getCartsBy(cid);
     

      // Verificar si se encontró el carrito
      if (!carrito) {
        throw new Error("Carrito no encontrado");
      }

      // Utilizar slice para vaciar el array de productos
      carrito.products = [];
      console.log(carrito);

      // Guardar los cambios en la base de datos
      await cartsModel.updateOne({ _id: cid }, { $set: carrito });
      return carrito;

      
    } catch (error) {
      // Manejar errores aquí
      console.error("Error al vaciar el carrito:", error);
    }
  }

  deleteCart = (cart) => {
    return cartsModel.findByIdAndDelete(cart);
  };
}
