import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Heart, ShoppingBag, User } from "lucide-react";
import { useCart } from "../components/CartContext";
import ProfileMenu from "./ProfileMenu"; // ⭐ IMPORT PROFILE MENU

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false); // ⭐ PROFILE SIDEBAR
  const { cart } = useCart();

  return (
    <>
      <nav className="w-full bg-[#f5f5f3] text-black shadow-sm border-b border-gray-300">
        <div className="flex justify-between items-center px-6 py-4">
          
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-200"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
              <li>
                <Link to="/" className="hover:text-black">Home</Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-black">Collections</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-black">New</Link>
              </li>
            </ul>
          </div>

          {/* Right Section Icons */}
          <div className="flex items-center space-x-3 relative">

            {/* Wishlist */}
            <button className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </button>

            {/* Cart with counter */}
            <Link
              to="/cart"
              className="hidden sm:flex items-center bg-black rounded-full px-3 py-2 text-white relative"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Profile Button */}
            <button
              onClick={() => setOpenProfile(true)}
              className="w-10 h-10 rounded-full bg-black flex items-center justify-center"
            >
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-[#f5f5f3] px-6 pb-4 border-t border-gray-200">
            <ul className="flex flex-col space-y-3 text-gray-700 font-medium">
              <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
              <li><Link to="/collections" onClick={() => setIsOpen(false)}>Collections</Link></li>
              <li><Link to="/products" onClick={() => setIsOpen(false)}>New</Link></li>
            </ul>
          </div>
        )}
      </nav>

      {/* ⭐ Profile Sidebar */}
      <ProfileMenu isOpen={openProfile} onClose={() => setOpenProfile(false)} />
    </>
  );
}
