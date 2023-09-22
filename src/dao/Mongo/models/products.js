import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const collection = "Products";

const Schema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    thumbnail: [],
    code: String,
    status: Boolean,
    stock: Number,
    owner: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);
Schema.virtual("UserCreate", {
  ref: "Users", //referencia a Users model
  localField: "owner", // campo local "purchaser"
  foreignField: "email", // campo que quiero traer de Users
  justOne: true, // solo ese campo
});

Schema.plugin(mongoosePaginate);

const productsModel = mongoose.model(collection, Schema);

export default productsModel;