const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      name: String,
      picture: String,
      price: Number,
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
