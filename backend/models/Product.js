import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  type: String,
  size: String,
  color: String,
  available: Boolean,
  category: String,
  image: String,
});

export default mongoose.model("Product", productSchema);
