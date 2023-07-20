import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const collection = "ProductsMocks";

const Schema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    code: String,
    status: Boolean,
    stock: Number
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


Schema.plugin(mongoosePaginate);

const productsMocksModel = mongoose.model(collection, Schema);

export default productsMocksModel;