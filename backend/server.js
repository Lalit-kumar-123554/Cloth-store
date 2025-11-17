// server.js

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

dotenv.config(); // ⭐ Load .env before anything

const app = express();

// ⭐ CORS for Render (fixed)
app.use(
  cors({
    origin: "*", // Allow all (you can restrict later)
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

// ⭐ API Routes
app.use("/api/products", productRoutes);

// ⭐ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { dbName: "cloth_store" })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// ⭐ IMPORTANT: Render gives PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
