import cartsModel from "../../Mongo/models/carts.js";
import productsManager from "./ProductManager.js";

const products = new productsManager();
const cartsM = new cartsModel();

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

    const product = await products.getProductsBy(pid);

    const cartId = await this.getCartsBy(cid);
    // console.log(cartId);



    const newProduct = cartId.products.find(
      ({ product }) => product == pid);
  

    if (newProduct) {
      newProduct.quantity += 1;
    } else {
      cartId.products.push({ product: product._id, quantity: 1 });
    }

    cartId.save();

    return cartId;

  };
  //   // const updatedCart = cartsModel.updateOne(
  //   //   { _id: cartId },
  //   //   { $push: { products: { product: new moongose.Types.objectId(prodId) } } }
  //   // );
  //   // // const populatedCart  = cartsModel.findOne({ _id: cartId }).populate("products.product");
  //   // // console.log((JSON.stringify(cart,null,'\t')));



  deleteProduct = async (cid, pid) => {
    // Obtener el carrito de compras
    const cart = await this.getCartsBy(cid);
    console.log(cart);
    // Verificar si el carrito existe
    if (!cart) {
      throw new Error("carrito no encontrado");
    }
    // Buscar el índice del producto en el carrito
    const productIndex = cart.products.findIndex((p) => p.product.toString() === pid);    
    if (productIndex === -1) {
      console.log("There is no product in the cart");
    }
    //Resto la quantity  
    const product = cart.products[productIndex];  
    product.quantity -= 1;
    if (product.quantity === 0) {
      // Eliminar el producto del carrito si la cantidad es cero
      cart.products.splice(productIndex, 1);
    }        
    //guardo los cambios del carrito:
    cart.save();
    return cart;

  }


  deleteCart = (cart) => {
    return cartsModel.findByIdAndDelete(cart);
  };
}
