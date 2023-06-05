import { Router } from "express";

const router = Router();

import CartManager from "../dao/Managers/FileSystem/CartManager.js";
import cartsModel from "../dao/Managers/Mongo/cartManager.js";


//mongo
const cartsM = new cartsModel();

//file system
const cm = new CartManager();
const carts = await cm.getCarts();

/*------------------MONGO--------------------------*/

router.get("/", async (req, res) => {
  try {
    const carts = await cartsM.getCarts();
    res.status(200).send({ status: "success", payload: carts });

  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});
router.get("/:cid", async (req, res) => {
  try {
    const {cid}= req.params;
    console.log(cid);
    const cartsId = await cartsM.getCartsBy(cid);
    console.log(cartsId);
    res.status(200).send({ status: "success", payload: cartsId });

  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});

router.post("/", async (req, res) => {
  try {

    const { products } = req.body;

    const savedCart = await cartsM.createCart(products);
    console.log(savedCart);


    res.status(200).send({ status: "success", payload: savedCart });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error" });
  }
});


router.post('/:cid/:pid', async (req, res) => {
  try {
    // const allCarts = await cartsM.getCarts();
    // console.log(allCarts);
    const { cid, pid } = req.params;
   


    const resultCart = await cartsM.addProduct(cid, pid);


    res.status(200).send({ status: "success", payload: resultCart });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error,contact the administrator" });
  }
});

router.put('/:cid/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    console.log(cid);
    const cart = await cartsM.getCartsBy(cid);
   

    // Verificar si el carrito existe
    if (!cart) {
      return res.status(404).send('cart not found');
    }
    // Buscar el índice del producto en el carrito
    const productIndex = cart.products.findIndex((p) => p.product._id.toString() === pid);
    if (productIndex === -1) {
      return res.status(404).send("There is no product in the cart");
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
  






    // const removedProductUnit = await cartsM.deleteProductUnit(cid, pid);
    
    res.status(200).send({ status: "success", payload: cart })
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error,contact the administrator" });
  }
})
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { cantidad } = req.body;
    const cart = await cartsM.getCartsBy(cid);

    if(!cart){
      return res.status(404).send('The cart does not exist');
    }
    // Busca el producto dentro del carrito
    const product = cart.products.find((p) => p.product._id.toString() === pid);
   
    if (!product) {
      return res.status(404).send('The product does not exist in the cart');
    }
    // Actualiza la cantidad del producto
    product.quantity = cantidad;

    // Guarda los cambios en el carrito
    await cart.save();

    res.status(200).send({ status: "success", payload: cart });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error,contact the administrator" });
  }
})

router.delete('/:cid/products/:pid', async (req,res) => {
  try {
    
    const { cid, pid } = req.params;
    const cart = await cartsM.getCartsBy(cid);
    const product = cart.products.find((p) => p.product._id.toString() === pid);
    
    if (!product) {
      return res.status(404).send('The product does not exist in the cart');
    }
    cart.products.splice(product,1);
    
    await cart.save();
    
    res.status(200).send({ status: "success", payload: cart })
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error,contact the administrator" });
  }



})

router.delete('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    await cartsM.deleteCart(cid);
    res.status(200).send({ status: "success", payload: "Cart removed successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error,contact the administrator" });
  }
})






















/*-------------------------FILE SYSTEM -------------------------*/

router.get("/", async (req, res) => {
  try {
    const allCarts = await carts;
    res.status(200).send('carts', { allCarts: allCarts });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const pos = parseInt(req.params.cid);
    const cart = await carts;
    const cartSelect = cart.find((cart) => cart.id === pos);
    console.log(cartSelect);
    res.status(200).send('home', { cart: cartSelect.id });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const cart = req.body;
//     const resCart = await cm.createCarts(cart);
//     res.status(200).send(resCart);
//   } catch (error) {
//     res
//       .status(500)
//       .send({ error: "Internal server error, contact the administrator" });
//   }
// });

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);

    const quant = isNaN(req.body?.quantity) ? 0 : parseInt(req.body?.quantity);

    const resAddProduct = await cm.addProduct(cid, pid, quant);
    res.status(200).send(resAddProduct);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});



router.post("/realtimecart", async (req, res) => {
  try {
    const cart = req.body;
    const resCart = await cm.createCarts(cart);
    const cartFinal = await cm.getCarts();
    // req.io.emit('carts', cartFinal);

    res.status(200).send({ status: "success", payload: resCart });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});

export default router;
