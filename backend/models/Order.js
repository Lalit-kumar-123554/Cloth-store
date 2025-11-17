import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
  total: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);
