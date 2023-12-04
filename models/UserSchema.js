const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    // cart: [{ type: mongoose.Schema.ObjectId, ref: "product" }],
    cart: [
      {
        productsId: { type: mongoose.Schema.ObjectId, ref: "products" },
        quantity: { type: Number, default: 1 },
      },
    ],
    wishlist: [{ type: mongoose.Schema.ObjectId, ref: "products" }],
    orders: [{ type: mongoose.Schema.ObjectId, ref: "orders" }],
  });
  

userSchema.pre("save", async function (next) { 
    const user = this;
    if (!user.isModified("password")) return next();

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
});

module.exports = mongoose.model("user", userSchema);  
