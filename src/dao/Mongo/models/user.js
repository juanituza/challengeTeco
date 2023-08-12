import mongoose from "mongoose";

const collection = "Users";

const userSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: {
      type: String,
      unique: true,
    },
    age: Number,
    password: String,
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Carts",
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "premium", "admin"],
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// Método para verificar si el usuario tiene el rol "premium"
// userSchema.methods.isPremium = function() {
//   return this.role === "premium";
// };

const userModel = mongoose.model(collection, userSchema);

export default userModel;
