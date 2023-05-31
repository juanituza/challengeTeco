import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const collection = "Products";

const Schema = new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    code: String,
    status: Boolean,
    stock: String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


Schema.plugin(mongoosePaginate);

const productsModel = mongoose.model(collection, Schema);

export default productsModel;