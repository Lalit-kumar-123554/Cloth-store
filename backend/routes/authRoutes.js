import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    phone,
    password: hashed,
  });

  res.json({ message: "Registered successfully", user });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ message: "Incorrect password" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  res.json({ message: "Login Successful", token, user });
});

export default router;
