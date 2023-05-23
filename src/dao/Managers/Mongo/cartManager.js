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
    
    const product = products.getProductsBy(pid);    
    const cartId= await this.getCartsBy(cid);  

    
    if (!cartId) {
      console.log("cart does not exist")
    }
    
    const newProduct = cartId.products.find(
      ({product}) => product == pid);
    if (newProduct) {
        newProduct.quantity += 1;
      }else{
        cartId.products.push ( {product: product._id, quantity:1});
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
    
     
  
  deleteProduct = (cid, pid) => {
    const cart = this.getCartsBy(cid)
    if (!cart) {
      console.log("carrito no encontrado")
    }

    const productIndex = cart.products.findIndex((p) => {
      p.product.toString() === pid
    })
    if (productIndex === -1) {
      console.log("There is no product in the cart")
    }
    //ahora le resto el precio al totalAmount:

    const product = products.findById(pid)
    cart.totalAmount -= product.price * cart.products[productIndex].quantity
    //borro el profucto del carrito:
    cart.products.splice(productIndex, 1)
    //guardo los cambios del carrito:
    cart.save()
    return cart

  }


  deleteCart = (cart) => {
    return cartsModel.findByIdAndDelete(cart);
  };
}
