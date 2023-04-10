import fs, { existsSync } from "fs";

export default class ProductManager {
  constructor() {
    this.products = [],
    (this.path = "./files/products.json");
     
  }

  appendProducts =async()=>{
    
    await fs.promises.writeFile(this.path,JSON.stringify(this.products, null, "\t"));
    
  }

  getProducts = async () => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      return products;
    }
    return [];
  };


  createProducts = async (product) => {
    const products = await this.getProducts();

    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.log("Incomplete data");
      return null;
    }
    if (products.length === 0) {
      product.id = 1;
    } else {
      const lastProduct = products[products.length - 1];
      product.id = lastProduct.id + 1;
    }
    if (
      typeof products.find((item) => item.code == product.code) !== "undefined"
    ) {
      console.log(`Duplicate product code ${product.code}`);
      return null;
    }
    products.push(product);
    
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, "\t")
    );
    return product;
  };

  getProductById = async (ID) => {
    const prod = await this.getProducts();
    const productId = prod.find((prod) => prod.id === ID);
    if (!productId) {
      return console.log("ID Not found");
    } else {
      return productId;
    }
  };

  // updateProduct = async (_id, camp, value) => {
  //   const produ = await this.getProducts();
  //   const pIndex = produ.findIndex((p) => p.id === _id);
  //   const pToUpdate = produ[pIndex];
  //   pToUpdate[camp] = value;
  //   produ[pIndex] = pToUpdate;
  //   const pJson = JSON.stringify(produ);
  //   await fs.promises.writeFile(this.path, pJson);
  // };

  updateProduct = async (_id, camp, value) => {
    const produ = await this.getProducts();    
      
    if (!produ[_id]) {     
        console.log('no existe id');
    }else{
      const produID = await this.getProductById(_id);
      produID[camp] = value;
      Object.assign(produ[_id - 1], produID);
      this.products = produ;
      this.appendProducts();
      // const pJson = JSON.stringify(produ);
      // await fs.promises.writeFile(this.path, pJson);
    }   
  };

  deleProduct = async (_id) => {
    const produ = await this.getProducts();
    const delProd = produ.filter((p) => p.id !== _id);
    const arrP = JSON.stringify(delProd);
    await fs.promises.writeFile(this.path, arrP);
  };
}
  
