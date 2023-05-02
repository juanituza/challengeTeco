import { Router } from "express";

const router = Router();

import ProductManager from "../Managers/ProductManager.js";

const pm = new ProductManager();

router.get("/products", async (req, res) => {
  const products = await pm.getProducts();
  res.render("products" , {allProducts : products});
});


router.get("/", async (req, res) => {
  
  res.render("home");
});



router.get("/realTimeProducts", async (req, res) => {
  
  res.render("realTimeProducts");
});

export default router;
