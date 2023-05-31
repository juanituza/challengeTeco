import { Router } from "express";
import productsModel from "../dao/Managers/Mongo/ProductManager.js";
import ProductManager from "../dao/Managers/FileSystem/ProductManager.js";
import ProdModel from '../dao/Mongo/models/products.js';

const router = Router();

const productM = new productsModel();
const pm = new ProductManager();

/* ------------------BASE DE DATOS MONGODB----------- */
router.get("/", async (req, res) => {
  const products = await productM.getProducts();
  // res.send({ status: "success", payload: products });

  try {
    const { page = 1 } = req.query;
    const { docs, totalPages,hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } = await ProdModel.paginate({}, { page, lean: true });
    const products = docs;
    
    // const limProd = req.query.limit;
    // if (!limProd) {
    //   res.send(products);
    // } else if (isNaN(limProd)) {
    //   res.status(400).send({ error: "limit is not a number" });
    // } else if (limProd < 0) {
    //   res.status(400).send({ error: "limit must be a positive number" });
    // } else {

      // const reduced = products.slice(0, limProd);
    res.status(201).send({ status: "success", payload: { products ,page: rest.page, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage }});
    // }
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});

router.post("/", async (req, res) => {
  try {
    const products = await productM.getProducts();
    const prod = req.body;
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

    const resProd = await productM.createProducts(prod);
    res.status(201).send({ status: "success", payload: resProd });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await productM.getProductsBy({ _id: pid });
  if (!product)
    return res
      .status(404)
      .send({ status: "error", error: "prodcut not found" });
  res
    .status(200)
    .send({ status: "success", payload: `product is : ${product}` });
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const updateProduct = req.body;
  const result = await productM.updateProduct(pid, updateProduct);
  res.status(200).send({ status: "succsses", payload: `Product upgraded successfully` });
});
router.delete("/:pid", async(req,res) =>{
  const {pid}=req.params;
  await productM.deleteProduct(pid);
  res.status(201).send({ status: "success", payload:"Product removed successfully"});
});








/* -----------------FILE SYSTEM------------------- */

router.get("/", async (req, res) => {
  const products = await pm.getProducts();

  try {
    const limProd = req.query.limit;
    // const allProducts = await products;

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

router.post("/", async (req, res) => {
  try {
    const products = await pm.getProducts();
    const prod = req.body;
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
router.get("/:pid", async (req, res) => {
  try {
    const pos = parseInt(req.params.pid);

    if (isNaN(pos)) {
      return res.status(400).send({ error: "product id is not a number " });
    }
    if (pos < 0) {
      return res
        .status(400)
        .send({ error: "product id must be a positive number " });
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

    req.io.emit("products", productsFinal);
    res.status(201).send({ status: "success", payload: resProd });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});

export default router;
