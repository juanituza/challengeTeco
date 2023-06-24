import BaseRouter from "./baseRouter.js";
import ProdModel from "../dao/Mongo/models/products.js";
import { productService } from "../dao/Managers/Mongo/index.js";

// const router = Router();

/* ------------------BASE DE DATOS MONGODB----------- */

export default class ProductRouter extends BaseRouter {
  init() {
    this.get("/", async (req, res) => {
      try {
        // declaro los parametros de la query
        const limit = parseInt(req.query.limit) || 10;
        const category = req.query.category;
        const page = parseInt(req.query.page) || 1;

        //metodo para agregar links pagina anterior y siguiente
        const prevAntPage = (products) => {
          if (products.hasPrevPage) {
            products.prevLink = `/api/products?page=${products.prevPage}`;
          } else {
            products.prevLink = null;
          }
          if (products.hasNextPage) {
            products.nextLink = `/api/products?page=${products.nextPage}`;
          } else {
            products.nextLink = null;
          }
        };

        //Filtro title, limit y page
        //si categoria no existe devuelvo todos los productos
        if (!category) {
          const products = await ProdModel.paginate(
            {},
            { limit, page, lean: true }
          );
          prevAntPage(products);

          res.status(201).send({
            status: "success",
            payload: `Category does not exist`,
            products,
          });
        } else {
          // si no filtro por el argumento category
          const products = await ProdModel.paginate(
            { title: category },
            { limit, page, lean: true }
          );

          prevAntPage(products);

          res.status(201).send({ status: "success", payload: products });
        }
      } catch (error) {
        res
          .status(500)
          .send({ error: "Internal server error, contact the administrator" });
      }
    });

    this.post("/", async (req, res) => {
      try {
        //obtengo todos los productos
        const products = await productService.getProducts();
        //Obtento los datos otorgados por body
        const prod = req.body;
        //Valido campos obligatorios
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
        //Valido que no se repita el campo "code"
        if (
          typeof products.find((item) => item.code == prod.code) !== "undefined"
        ) {
          return res.status(400).send({ error: `Duplicate product code` });
        }
        // Creo el producto
        const resProd = await productService.createProducts(prod);
        res.status(201).send({ status: "success", payload: resProd });
      } catch (error) {
        res
          .status(500)
          .send({ error: "Internal server error, contact the administrator" });
      }
    });

    this.get("/:pid", async (req, res) => {
      const { pid } = req.params;
      const product = await productService.getProductsBy({ _id: pid });
      if (!product)
        return res
          .status(404)
          .send({ status: "error", error: "prodcut not found" });
      res
        .status(200)
        .send({ status: "success", payload: `product is : ${product}` });
    });

    this.put("/:pid", async (req, res) => {
      const { pid } = req.params;
      const updateProduct = req.body;
      const result = await productService.updateProduct(pid, updateProduct);
      res.status(200).send({
        status: "succsses",
        payload: `Product upgraded successfully`,
        result,
      });
    });
    this.delete("/:pid", async (req, res) => {
      const { pid } = req.params;
      await productService.deleteProduct(pid);
      res
        .status(201)
        .send({ status: "success", payload: "Product removed successfully" });
    });
  }
}


