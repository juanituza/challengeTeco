import { Router } from "express";
import ProductManager from "../Managers/ProductManager.js";

const router = Router();

const pm = new ProductManager();
// const products = await pm.getProducts();

// router.use(express.json());

router.get("/", async (req, res) => {
  const products = await pm.getProducts();
  try {
    const limProd = req.query.limit;
    // const allProducts = await products;
    console.log(limProd);
    if (!limProd) {
      // res.status(201).render("products",{ allProducts: products});
      res.send(products);
    } else if (isNaN(limProd)) {
      res.status(400).send({ error: "limit is not a number" });
    } else if (limProd < 0) {
      res.status(400).send({ error: "limit must be a positive number" });
    } else {
      const reduced = products.slice(0, limProd);
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


    if (isNaN(pos)) {
      return res.status(400).send({ error: "product id is not a number " });
    }
    if (pos < 0) {
      return res.status(400).send({ error: "product id must be a positive number " });
    }
    const prod = await pm.getProducts();

    const prodSelect = prod.find((prod) => prod.id === pos);
    if (prodSelect === undefined) {
      res.status(400).send({ error: "id does not belong to a product" });
    } else {
      res.status(200).send(prodSelect);
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});

router.post("/", async (req, res) => {
  try {
    const products = await pm.getProducts();
    const prod = req.body;

    // const products = await pm.getProducts();
    // console.log(prod);
    if (
      !prod.title ||
      !prod.description ||
      !prod.price ||
      !prod.code ||
      !prod.status ||
      !prod.stock
    ) {
      return res.status(400).send({ error: `Incomplete data` });
    }
    if (
      typeof products.find((item) => item.code == prod.code) !== "undefined"
    ) {
      return res.status(400).send({ error: `Duplicate product code` });
    }

    const resProd = await pm.createProducts(prod);
    res.status(201).send({ status: "success", payload: resProd });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const elem = req.body;

    if (elem.code !== undefined) {
      res.status(400).send({ error: `Duplicate product code` });
    } else {
      await pm.updateProduct(id, elem);

      res.status(200).send(products);
    }
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

    res.status(200).send({ MessageEvent: "product removed successfully " });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});


router.post("/realtimeproducts", async (req, res) => {
  try {

    const prod = req.body;
    const products = await pm.getProducts();
    // console.log(prod);
    if (
      !prod.title ||
      !prod.description ||
      !prod.price ||
      !prod.code ||
      !prod.status ||
      !prod.stock
    ) {
      return res.status(400).send({ error: `Incomplete data` });
    }
    if (
      typeof products.find((item) => item.code == prod.code) !== "undefined"
    ) {
      return res.status(400).send({ error: `Duplicate product code` });
    }

    const resProd = await pm.createProducts(prod);

    const productsFinal = await pm.getProducts();

    req.io.emit('products', productsFinal);
    res.status(201).send({ status: "success", payload: resProd });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});

export default router;