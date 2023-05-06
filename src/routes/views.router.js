import { Router } from "express";


const router = Router();

import ProductManager from "../Managers/ProductManager.js";

const pm = new ProductManager();

router.get("/products", async (req, res) => {
  const products = await pm.getProducts();
  res.render("products", { allProducts: products })
});




router.get("/products/:pid", async (req, res) => {
  const products = await pm.getProducts();
  res.render("products", { productLimit: products })
});
//   try {
//     const pos = parseInt(req.params.pid);


//     if (isNaN(pos)) {
//       return res.status(400).send({ error: "ERROR! Product id is not a number " });
//     }
//     if (pos < 0) {
//       return res.status(400).send({ error: "ERROR! Product id must be a positive number " });
//     }
//     const prod = await pm.getProducts();

//     const prodSelect = prod.find((prod) => prod.id === pos);
//     if (prodSelect === undefined) {
//       res.status(400).send({ error: "id does not belong to a product" });
//     } else {
//       res.status(200).send (prodSelect);
//       // res.render("products", { productid: prodSelect });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .send({ error: "Internal server error, contact the administrator" });
//   }
// });


router.get("/", async (req, res) => {
  
  res.render("home");
});



router.get("/realtimeproducts", async (req, res) => {
  
  res.render("realTimeProducts");
});

export default router;
