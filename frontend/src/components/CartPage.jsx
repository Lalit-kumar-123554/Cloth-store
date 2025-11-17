import React, { useState } from "react";
import { useCart } from "../components/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    country: "",
    state: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [showSummary, setShowSummary] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  const shippingCost = 10;
  const grandTotal = total + shippingCost;

  // ⭐ Handle form update
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ⭐ Show summary
  const handleShipping = (e) => {
    e.preventDefault();
    setShowSummary(true);
  };

  // ⭐ Save order to localStorage
  const saveOrderToHistory = () => {
    const previousOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: Date.now(),
      items: cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      })),
      total: `$${grandTotal}`,
      date: new Date().toLocaleDateString(),
      address: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.postalCode}`,
    };

    previousOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(previousOrders));
  };

  // ⭐ Continue (Place Order)
  const handleContinue = () => {
    if (!agreeTerms) {
      alert("Please agree to the Terms and Conditions before continuing.");
      return;
    }

    saveOrderToHistory(); // ⭐ Save in localStorage
    clearCart(); // ⭐ Empty cart

    alert("Order placed successfully! 🎉");
  };

  // If cart empty
  if (cart.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-3">Your cart is empty 🛒</h2>
        <p className="text-gray-500">Start shopping to add items here.</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen px-6 md:px-12 py-10">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 🛍️ LEFT SIDE — CART ITEMS */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center bg-white p-4 rounded-lg shadow-sm"
            >
              <img
                src={item.image || item.img}
                alt={item.name}
                className="w-[100px] h-[120px] object-cover rounded-md"
              />
              <div className="flex-1 sm:ml-6 mt-4 sm:mt-0">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-800 font-medium mt-2">${item.price}</p>
                <p className="text-gray-600 text-sm mt-1">
                  Quantity: {item.quantity || 1}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 font-medium hover:text-red-700 mt-3 sm:mt-0"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* 💳 RIGHT SIDE — SHIPPING + SUMMARY */}
        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          
          {!showSummary ? (
            <>
              <h3 className="text-xl font-semibold mb-4">Shipping Details</h3>

              <form onSubmit={handleShipping} className="space-y-5">

                {/* CONTACT INFO */}
                <h4 className="font-semibold text-lg text-gray-800 mb-2">Contact Info</h4>

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />

                {/* SHIPPING ADDRESS */}
                <h4 className="font-semibold text-lg text-gray-800 mt-4 mb-2">
                  Shipping Address
                </h4>

                <div className="flex space-x-3">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />

                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>

                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                >
                  <option value="">Country</option>
                  <option value="India">India</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                </select>

                <input
                  type="text"
                  name="state"
                  placeholder="State / Region"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />

                <div className="flex space-x-3">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />

                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    className="w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 flex justify-center items-center space-x-2 transition"
                >
                  <span>Shipping</span>
                  <span>→</span>
                </button>

              </form>
            </>
          ) : (
            <>
              {/* SUMMARY SECTION */}
              <h3 className="text-xl font-semibold mb-4">ORDER SUMMARY</h3>

              <div className="space-y-2 text-gray-700 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shippingCost}</span>
                </div>
              </div>

              <div className="border-t border-gray-300 pt-3 mb-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>TOTAL (TAX INCL.)</span>
                  <span>${grandTotal}</span>
                </div>
              </div>

              <label className="flex items-center space-x-2 mb-4 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 border-gray-400"
                />
                <span>I agree to the Terms and Conditions</span>
              </label>

              <button
                onClick={handleContinue}
                className="w-full bg-gray-200 text-gray-900 py-2 rounded-md font-semibold hover:bg-gray-300 transition"
              >
                CONTINUE
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
