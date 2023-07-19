import mongoose from "mongoose";

const collection = "Tickets";

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: Number,
  purchaser: {
    type: String,
    ref: "Users",
  },
  products: [
    {
      quantity: {
        type: Number,
        default: 0,
      },

      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
    },
  ],
});

ticketSchema.virtual("purchaserEmail", {
  ref: "Users", //referencia a Users model
  localField: "purchaser", // campo local "purchaser"
  foreignField: "email", // campo que quiero traer de Users
  justOne: true, // solo ese campo
});
ticketSchema.pre(/^find/, function () {
  this.populate('products.product');
})
const ticketsModel = mongoose.model(collection, ticketSchema);

export default ticketsModel;
