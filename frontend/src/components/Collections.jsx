// src/components/Collections.jsx
import React, { useState,useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useCart } from "../components/CartContext";

const allProducts = [
  {
    id: 1,
    type: "Cotton T-Shirt / Oversized Heavy Weight Tee",
    name: "Heavy-Duty Orange Graphic T-Shirt",
    price: 199,
    category: "MEN",
    image: "/products/7.webp",


  },
  {
    id: 2,
    type: "Cotton T-Shirt / Printable Tee",
    name: "Custom Print White T-Shirt",
    price: 299,
    category: "MEN",
    image: "/products/8.webp",

  },
  {
    id: 3,
    type: "Sportswear / Athletic Long Sleeve T-Shirt",
    name: "Dual-Tone Performance Long Sleeve T-Shirt",
    price: 249,
    category: "MEN",
   image: "/products/9.webp",

  },
  {
    id: 23,
    type: "Casual Check Shirt",
    name: "UrbanWear Blue Checkered Casual Shirt",
    price: 149,
    category: "MEN",
    image: "/products/23.webp",

  },
  {
    id: 24,
    type: "Premium Formal Shirt",
    name: "UrbanWear Light Beige Luxury Stretch Shirt",
    price: 249,
    category: "MEN",
    image: "/products/24.webp",

  },
  {
  id: 27,
  type: "Women's Dress",
  name: "Green Floral Sleeveless Summer Dress",
  price: 799,
  category: "WOMEN",
  image: "/products/27.webp",

},

{
  id: 28,
  type: "Women's Ethnic Wear",
  name: "Red Embroidered Anarkali Gown",
  price: 1899,
  category: "WOMEN",
  image: "/products/28.webp",

},

{
  id: 29,
  type: "Women's Printed Dress",
  name: "Blue Paisley Printed Midi Dress",
  price: 999,
  category: "WOMEN",
  image: "/products/29.webp",

},

{
  id: 30,
  type: "Women's Party Gown",
  name: "Beige Luxury Embellished Evening Gown",
  price: 2499,
  category: "WOMEN",
  image: "/products/30.webp",

},

{
  id: 31,
  type: "Women's Floral Dress",
  name: "Pink Multicolor Floral Tiered Dress",
  price: 899,
  category: "WOMEN",
  image: "/products/31.webp",

}

];

export default function Collections() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");
  const [visibleCount, setVisibleCount] = useState(3); // ⭐ SHOW ONLY 3 FIRST
  const { addToCart } = useCart();
 const API = import.meta.env.VITE_API_URL;
 
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

  // Filter
  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory);

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  // ⭐ Show limited products at first
  const visibleProducts = sortedProducts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(allProducts.length); // Show all 5 products
  };

  return (
    <section className="px-6 py-10 bg-gray-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold uppercase leading-tight">
            XIV <br /> Collections <br /> 23–24
          </h2>
        </div>

        <div className="flex gap-8 mt-6 md:mt-0">
          <div>
            <p className="font-medium text-gray-600">Filters(+)</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Sorts(-)</p>
            <button
              onClick={() => setSortOrder("asc")}
              className="text-sm text-gray-500 hover:text-black"
            >
              Less to More
            </button>
            <br />
            <button
              onClick={() => setSortOrder("desc")}
              className="text-sm text-gray-500 hover:text-black"
            >
              More to Less
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-6 border-b pb-3 mb-8 text-sm font-medium text-gray-700 flex-wrap">
        {["All", "MEN", "WOMEN", "KID"].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setVisibleCount(3); // Reset to 3 on category change
            }}
            className={`${
              selectedCategory === cat
                ? "text-black border-b-2 border-black"
                : "text-gray-500"
            } hover:text-black transition`}
          >
            ({cat})
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleProducts.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-sm hover:shadow-md transition rounded-xl p-4"
          >
            <div className="relative group">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[350px] object-cover rounded-xl"
              />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow opacity-0 group-hover:opacity-100 transition">
                <span className="text-lg font-bold">+</span>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-500">{item.type}</p>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-800 font-medium mt-1">${item.price}</p>

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

      {/* ⭐ Load More Button – shows remaining 2 products */}
      {visibleCount < sortedProducts.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            className="flex items-center gap-1 text-gray-600 hover:text-black font-medium"
          >
            More <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}
