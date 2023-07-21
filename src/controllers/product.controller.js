import ProdModel from "../dao/Mongo/models/products.js";
// import { productService } from "../dao/Managers/Mongo/index.js";
import { productService } from "../services/repositories/index.js";
import productDTO from "../dto/productDTO.js";
import {
  productsErrorIncompleteData,
  productsErrorDuplicateCode,
  productsIdNotFound,
} from "../constants/productsErrors.js";

import ErrorService from "../services/repositories/ErrorServicer.js";
import EErrors from "../constants/Eerrors.js";
import ObjectId from "mongoose";

const getProducts = async (req, res) => {
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

      res.sendSuccessWithPayload(products);
    }
  } catch (error) {
    res.sendInternalError("Internal server error, contact the administrator");
  }
};

const createProducts = async (req, res) => {
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
    ErrorService.createError({
      name: "Incomplete data",
      cause: productsErrorIncompleteData(prod),
      message: "Incomplete data",
      code: EErrors.INCOMPLETE_DATA,
      status: 400,
    });
  }
  //Valido que no se repita el campo "code"
  if (typeof products.find((item) => item.code == prod.code) !== "undefined") {
    ErrorService.createError({
      name: "Duplicate product code",
      cause: productsErrorDuplicateCode(prod),
      message: "Duplicate product code",
      code: EErrors.DUPLICATE_CODE,
      status: 400,
    });
  }
  // Creo el producto
  const resProd = await productService.createProducts(prod);
  res.sendSuccessWithPayload({ ...new productDTO(resProd) });
};

const getProductsBy = async (req, res) => {
  const { pid } = req.params;
  //obtengo todos los productos
  const products = await productService.getProducts();
  //Verifico si el ID existe en los productos
  const productId = products.find((p) => p._id.toString() === pid);
  //Si no existe arrojo error
  if (!productId) {
    ErrorService.createError({
      name: "Id not found",
      cause: productsIdNotFound(pid),
      message: "Get product error",
      code: EErrors.ID_NOT_FOUND,
      status: 400
    });
   } else {
    //si existe ID busco el producto y lo devuelvo
    const product = await productService.getProductsBy(pid);
    res.sendSuccessWithPayload(product);
  }
};

const updateProduct = async (req, res) => {
  const { pid } = req.params;
  const updateProduct = req.body;
  const result = await productService.updateProduct(pid, updateProduct);
  res.sendSuccessWithPayload(`Product upgraded successfully`, result);
};

const deleteProduct = async (req, res) => {
  const { pid } = req.params;
  await productService.deleteProduct(pid);
  res.sendSuccess("Product removed successfully");
};

export default {
  getProducts,
  createProducts,
  getProductsBy,
  updateProduct,
  deleteProduct,
};
