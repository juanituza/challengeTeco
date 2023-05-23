import mongoose from "mongoose";

const collection = "Products";

const Schema = new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    code: String,
    status: Boolean,
    stock: String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


const productsModel = mongoose.model(collection, Schema);

export default productsModel;