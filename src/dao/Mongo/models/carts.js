import mongoose from "mongoose";
import  productsModel  from "./products.js";

const collection = "Carts";

const cartSchema = new mongoose.Schema({
  // products:[
  //          {
  //             quantity: {
  //               type: Number,
  //               required: true,
                
  //               },
  //               product: {
  //                 type: mongoose.Schema.Types.ObjectId,
  //                 ref: "Products",
  //                 required: true,
  //               },
  //           }
  //         ]
      
    products: [
      {
        quantity: Number,
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
        },
      },
    ],
  
    
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// schema.pre('find', function () {
//     this.populate('products.product');
// })

const cartsModel = mongoose.model(collection, cartSchema);

export default cartsModel;


