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
    res.status(200).send(carts);

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
    const carts = await cartsM.getCartsBy(cid);
    // console.log(carts);
    console.log(cid);
    console.log(pid);


    const removedProduct = await cartsM.deleteProduct(cid, pid);
    console.log(removedProduct);
    res.status(200).send({ status: "success", payload: removedProduct })
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
