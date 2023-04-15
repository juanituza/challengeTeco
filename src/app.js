import express from "express";
import ProductManager from "../src/ProductManager+Mckenna.js";

const app = express();

const pm = new ProductManager();
const products = pm.getProducts();

// app.use(express.json());
// app.use(express.json());

app.get("/products", async (req, res) => {
  try {
    const limProd = req.query.limit;
    const allProducts = await products;
    if (!limProd) {
      res.send(allProducts);
    } else {
      const reduced = allProducts.slice(0, limProd);
      res.send(reduced);
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});

app.get ('/products/:pid', async(req,res) => {
    try {
        const pos = parseInt(req.params.pid);
        const prod = await products;
        const prodSelect = prod.find((prod) => prod.id === pos);
        res.send(prodSelect)
    } catch (error) {
        res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });

    }   
});







app.listen(8080, () => console.log("Listening on http://localhost:8080"));
