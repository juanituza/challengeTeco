import mongoose from "mongoose";

const collection = "Carts";

const cartSchema = new mongoose.Schema({
    



    products: {
    type:[
      {
        quantity: {
          type:Number,
          default:0
        },

        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
        },
      },
    ],
  
    
  }
},
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// cartSchema.pre('find', function () {
//     this.populate('Products.product');
// })

const cartsModel = mongoose.model(collection, cartSchema);

export default cartsModel;


