import React from "react";
import { ArrowRight, ArrowLeft, Search } from "lucide-react";

export default function NewCollection() {
  return (
    <section className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 py-12 text-black">

      {/* Sidebar */}
      <div className="flex flex-col md:w-1/3 w-full space-y-6">

        <div className="flex md:flex-col flex-row justify-center md:justify-start md:space-y-3 space-x-6 md:space-x-0 text-gray-800 font-medium">
          <span className="cursor-pointer hover:text-black">MEN</span>
          <span className="cursor-pointer hover:text-black">WOMEN</span>
          <span className="cursor-pointer hover:text-black">KIDS</span>
        </div>

        <div className="flex items-center bg-[#e5e5e5] rounded-md px-3 py-2 w-full md:w-2/3">
          <Search className="w-4 h-4 text-gray-700 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none w-full placeholder:text-gray-600 text-sm"
          />
        </div>

        <div className="mt-4">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            NEW <br />
            <span className="font-black">COLLECTION</span>
          </h1>
          <p className="text-gray-700 mt-2">2025</p>
        </div>

        <div className="flex items-center space-x-4 mt-8">
          <button className="bg-[#d9d9d9] hover:bg-[#ccc] text-black px-5 py-2 rounded-md flex items-center space-x-2">
            <span>Go To Shop</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-2">
            <button className="border border-gray-400 p-2 hover:bg-gray-200 rounded-md">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button className="border border-gray-400 p-2 hover:bg-gray-200 rounded-md">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Images (NO IMPORT NEEDED) */}
      <div className="flex md:w-2/3 w-full justify-center mt-10 md:mt-0 space-x-6 flex-wrap">
        <div className="bg-white shadow-sm hover:scale-105 transition-transform duration-300">
          <img
            src="/products/1.webp"
            alt="Product"
            className="w-[300px] h-[380px] object-cover"
          />
        </div>

        <div className="bg-white shadow-sm hover:scale-105 transition-transform duration-300">
          <img
            src="/products/2.webp"
            alt="Product"
            className="w-[300px] h-[380px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
