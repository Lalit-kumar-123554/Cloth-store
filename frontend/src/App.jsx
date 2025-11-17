// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Collections from "./components/Collections";
import ProductsPage from "./components/ProductsPage";
import CartPage from "./components/CartPage";

// Context
import { CartProvider } from "./components/CartContext";

// Toast Notifications
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <CartProvider>
      <Router>
        {/* Toast notification container */}
        <Toaster position="top-center" reverseOrder={false} />

        {/* Global Navbar */}
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
