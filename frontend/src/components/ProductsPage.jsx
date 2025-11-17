// src/components/ProductsPage.jsx
import React, { useState, useEffect } from "react";
import { useCart } from "../components/CartContext";

export default function ProductsPage() {
  const { addToCart } = useCart();

  const API = import.meta.env.VITE_API_URL;
  const [allProducts, setAllProducts] = useState([]);

  console.log("API URL =", API);

  // ✅ Fetch products from MongoDB
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(`${API}/api/products`);
        const data = await res.json();
        console.log("Fetched Products:", data);
        setAllProducts(data); // ⭐ load MongoDB products
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    getProducts();
  }, [API]);

  // ---------------------------------
  // FILTER FUNCTIONALITY
  // ---------------------------------
  const [filters, setFilters] = useState({
    size: "",
    type: "",
    color: "",
    available: null,
    price: 500,
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? "" : value,
    }));
  };

  const handleAvailabilityChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      available: prev.available === value ? null : value,
    }));
  };

  const handlePriceChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      price: Number(e.target.value),
    }));
  };

  // ⭐ FILTER DYNAMIC PRODUCTS (from MongoDB)
  const filteredProducts = allProducts.filter((product) => {
    return (
      (filters.size ? product.size === filters.size : true) &&
      (filters.type ? product.type === filters.type : true) &&
      (filters.color ? product.color === filters.color : true) &&
      (filters.available !== null
        ? product.available === filters.available
        : true) &&
      product.price <= filters.price
    );
  });

  return (
    <section className="bg-gray-50 min-h-screen px-6 md:px-10 py-10">
      <p className="text-sm text-gray-400 mb-2">Home / Products</p>
      <h2 className="text-2xl font-extrabold uppercase mb-6">Products</h2>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* ----------------------------------
            LEFT FILTER SIDE
        ---------------------------------- */}
        <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-sm h-fit">
          <h3 className="font-semibold mb-4 text-lg">Filters</h3>

          {/* Size */}
          <div className="mb-6">
            <h4 className="font-medium text-sm mb-2">Size</h4>
            <div className="flex gap-2 flex-wrap">
              {["XS", "S", "M", "L", "XL", "2X"].map((size) => (
                <button
                  key={size}
                  onClick={() => handleFilterChange("size", size)}
                  className={`border px-3 py-1 text-sm rounded transition ${
                    filters.size === size
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="mb-6">
            <h4 className="font-medium text-sm mb-2">Category</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              {["Cotton T-Shirt", "Crewneck T-Shirt", "Polo T-Shirt"].map(
                (type) => (
                  <li key={type}>
                    <button
                      onClick={() => handleFilterChange("type", type)}
                      className={`w-full text-left py-1 px-2 rounded ${
                        filters.type === type
                          ? "bg-black text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {type}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Colors */}
          <div className="mb-6">
            <h4 className="font-medium text-sm mb-2">Colors</h4>
            <div className="flex flex-wrap gap-3">
              {["black", "white", "gray", "beige", "green"].map((color) => (
                <div
                  key={color}
                  onClick={() => handleFilterChange("color", color)}
                  className={`w-6 h-6 rounded-full border cursor-pointer ${
                    filters.color === color ? "ring-2 ring-black" : ""
                  }`}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="mb-6">
            <h4 className="font-medium text-sm mb-2">Availability</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <label>
                <input
                  type="checkbox"
                  checked={filters.available === true}
                  onChange={() => handleAvailabilityChange(true)}
                  className="mr-2"
                />
                Available
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filters.available === false}
                  onChange={() => handleAvailabilityChange(false)}
                  className="mr-2"
                />
                Out Of Stock
              </label>
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h4 className="font-medium text-sm mb-2">Price Range</h4>
            <input
              type="range"
              min="50"
              max="500"
              value={filters.price}
              onChange={handlePriceChange}
              className="w-full accent-black"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$50</span>
              <span>${filters.price}</span>
            </div>
          </div>
        </div>

        {/* ----------------------------------
            RIGHT SIDE - PRODUCT GRID
        ---------------------------------- */}
        <div className="w-full md:w-3/4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((item) => (
                <div
                  key={item._id}
                  className="bg-white shadow-sm hover:shadow-md rounded-xl overflow-hidden transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-[380px] object-cover"
                  />
                  <div className="p-4">
                    <p className="text-xs text-gray-500 mb-1">{item.type}</p>
                    <h3 className="text-base font-semibold">{item.name}</h3>
                    <p className="text-gray-800 font-medium mt-1">
                      ${item.price}
                    </p>

                    {/* ADD TO CART */}
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
          ) : (
            <p className="text-center text-gray-500 mt-20">No products found.</p>
          )}
        </div>
      </div>
    </section>
  );
}




// { id: 4, name: "Grey Abstract Print Shirt", price: 179, type: "Casual Shirt / Summer Wear", size: "S", color: "gray", available: true, image: img18 },
//     { id: 5, name: "Light Blue Casual Button-Down Shirt", price: 249, type: "Cotton Casual Shirt", size: "M", color: "beige", available: true, image: img19 },
//     { id: 6, name: "Silver Premium Formal Shirt", price: 199, type: "Formal Office Shirt / Full Sleeve", size: "L", color: "black", available: true, image: img20 },
//     {
//       id: 26,
//       name: "Olive Green Printed Crewneck T-Shirt",
//       price: 199,
//       type: "Cotton Printed T-Shirt",
//       size: "M",
//       color: "Olive Green",
//       available: true,
//       category: "Men",
//       image: "/src/Image/26.webp",
//     },
//     {
//       id: 27,
//       name: "Maroon Trident Logo Polo T-Shirt",
//       price: 249,
//       type: "Cotton Polo / Casual Wear",
//       size: "M",
//       color: "Maroon",
//       available: true,
//       category: "Men",
//       image: "/src/Image/25.webp",
//     },