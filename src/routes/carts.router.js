import { Router } from "express";

const router = Router();

import CartManager from "../Managers/CartManager.js";

const cm = new CartManager();
const carts = cm.getCarts();

router.get("/", async (req, res) => {
  try {
    const allCarts = await carts;
    res.status(200).render('carts' , {allCarts : allCarts});
  } catch (error) {
    res
      .status(500)
      .render({ error: "Internal server error, contact the administrator" });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const pos = parseInt(req.params.cid);
    const cart = await carts;
    const cartSelect = cart.find((cart) => cart.id === pos);
    console.log(cartSelect);
    res.status(200).render('home',{cart : cartSelect.id});
  } catch (error) {
    res
      .status(500)
      .render({ error: "Internal server error, contact the administrator" });
  }
});

router.post("/", async (req, res) => {
  try {
    const cart = req.body;
    const resCart = await cm.createCarts(cart);
    res.status(200).render(resCart);
  } catch (error) {
    res
      .status(500)
      .render({ error: "Internal server error, contact the administrator" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);

    const quant = isNaN(req.body?.quantity) ? 0 : parseInt(req.body?.quantity);

    const resAddProduct = await cm.addProduct(cid, pid, quant);
    res.status(200).render(resAddProduct);
  } catch (error) {
    res
      .status(500)
      .render({ error: "Internal server error, contact the administrator" });
  }
});

export default router;
