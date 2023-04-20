import { Router } from "express";

const router = Router();

import ProductManager from "../Managers/ProductManager.js";

const pm = new ProductManager();
const products = pm.getProducts();

// router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const limProd = req.query.limit;
    const allProducts = await products;
    if (!limProd) {
      res.send(allProducts);
    } else {
      const reduced = allProducts.slice(0, limProd);
      res.status(200).send(reduced);
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const pos = parseInt(req.params.pid);
    const prod = await products;
    const prodSelect = prod.find((prod) => prod.id === pos);
    res.status(200).send(prodSelect);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});

router.post("/", async (req, res) => {
  try {
    const prod = req.body;
    const resProd = await pm.createProducts(prod);
    res.status(200).send(resProd);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});

router.put("/:pid", async (req, res) => {
  try {

    const id = parseInt(req.params.pid);
    const content= req.body;
    // const prod = await products;

    await pm.updateProduct(id, content);
    res.status(200).send(products);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    
      await pm.deleteProduct(id);
      res.status(200).send(products);

  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});

export default router;
