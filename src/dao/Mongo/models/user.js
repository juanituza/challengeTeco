import mongoose from "mongoose";

const collection="Users";

const userSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:{
        type:String,
        unique:true
    },
    password:String
},{timestamps:{createdAt:'created_at', updatedAt:'updated_at'}});

const userModel = mongoose.model(collection,userSchema);

export default userModel;

