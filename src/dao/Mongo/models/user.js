import mongoose from "mongoose";

const collection="Users";

const userSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:{
        type:String,
        unique:true
    },
    age:Number,
    password:String,
    cart :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Carts'
    },
    role:{
        type:String,
        default: "user"
    }
},{timestamps:{createdAt:'created_at', updatedAt:'updated_at'}});

// userSchema.pre(/^find/, function () {
//     this.populate('carts.products');
// })
// userSchema.pre('find', function () {
//     this.populate('carts.products');
// })

const userModel = mongoose.model(collection,userSchema);

export default userModel;

