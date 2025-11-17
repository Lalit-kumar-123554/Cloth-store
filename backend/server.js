import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();  // ⭐ MUST be at TOP

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { dbName: "cloth_store" })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
