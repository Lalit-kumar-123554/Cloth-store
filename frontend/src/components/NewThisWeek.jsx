// src/components/NewThisWeek.jsx
import React, { useState,useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCart } from "../components/CartContext";

// Products List
const products = [
  {
    id: 1,
    type: "V-Neck / Casual Graphic Tee",
    name: "ALONE Graphic Print T-Shirt",
    price: 1349,
    image: "/public/products/3.webp",
  },
  {
    id: 2,
    type: "Cotton Polo / Casual Wear",
    name: "Navy Slim Fit Polo T-Shirt",
    price: 1299,
    image: "/public/products/4.webp",
  },
  {
    id: 3,
    type: "Henley / Activewear Zip Polo",
    name: "Half-Zip High Neck T-Shirt",
    price: 1199,
    image: "/public/products/5.webp",
  },
  {
    id: 4,
    type: "Crewneck / Premium Polo",
    name: "Black Full Sleeve Polo T-Shirt",
    price: 349,
    image: "/public/products/6.webp",
  },
  {
    id: 21,
    type: "Premium Formal Shirt",
    name: "UrbanWear Light Beige Luxury Stretch Shirt",
    price: 249,
    image: "/public/products/21.webp",
  },
  {
    id: 22,
    type: "Formal Slim Fit Shirt",
    name: "UrbanWear Steel Blue Classic Shirt",
    price: 899,
    image: "/public/products/22.webp",
  },
];

export default function NewThisWeek() {
  const { addToCart } = useCart();

  // ⭐ Pagination State
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);
 const API = import.meta.env.VITE_API_URL;
console.log("API URL =", API); 
useEffect(() => {
  const getProducts = async () => {
    try {
      const res = await fetch(`${API}/api/products`);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  getProducts();
}, []);

  // ⭐ Navigation
  const handleNext = () => {
    if (startIndex + itemsPerPage < products.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  return (
    <section className="px-6 py-10 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <h2 className="text-3xl md:text-4xl font-extrabold uppercase">
          New <span className="text-black">This Week</span>
          <span className="text-blue-600 ml-2">({products.length})</span>
        </h2>
        <button className="text-sm font-medium text-gray-600 hover:text-black transition">
          See All →
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleProducts.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-sm hover:shadow-md transition rounded-xl p-4"
          >
            <div className="relative group">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[400px] object-cover rounded-xl"
              />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition">
                <span className="text-lg font-bold">+</span>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-500">{item.type}</p>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-700 font-medium mt-1">${item.price}</p>

              {/* Add to Cart */}
              <button
                onClick={() => addToCart(item)}
                className="mt-3 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-center items-center mt-8 gap-3">
        <button
          onClick={handlePrev}
          className="border p-2 rounded hover:bg-gray-200 transition"
        >
          <ArrowLeft />
        </button>

        <button
          onClick={handleNext}
          className="border p-2 rounded hover:bg-gray-200 transition"
        >
          <ArrowRight />
        </button>
      </div>
    </section>
  );
}
