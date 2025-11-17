import React, { useState, useEffect } from "react";

export default function ProfileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [editMode, setEditMode] = useState(false);

  const [activeTab, setActiveTab] = useState("menu"); // ⭐ default menu screen

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [newAddress, setNewAddress] = useState("");

  useEffect(() => {
    // Load Account
    const saved = JSON.parse(localStorage.getItem("userData"));
    if (saved) {
      setUserData(saved);
    } else {
      setUserData({
        name: "Lalitkumar mohanta",
        email: "sreelalit@gmail.com",
        phone: "9040846548",
      });
    }

    // Load Orders
    const savedOrders = JSON.parse(localStorage.getItem("orders"));
    setOrders(savedOrders || []);

    // Load Address
    const savedAddress = JSON.parse(localStorage.getItem("addresses"));
    setAddresses(savedAddress || []);

    // Load Notifications
    const savedNoti = JSON.parse(localStorage.getItem("notifications"));
    setNotifications(savedNoti || ["Welcome to our store!", "Your profile is updated."]);
  }, []);

  const handleSaveAccount = () => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setEditMode(false);
  };

  const saveAddress = () => {
    if (!newAddress.trim()) return;
    const updated = [...addresses, newAddress];
    setAddresses(updated);
    localStorage.setItem("addresses", JSON.stringify(updated));
    setNewAddress("");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
      <div className="bg-white w-80 h-full overflow-y-auto p-6 relative">

        {/* CLOSE */}
        <button onClick={onClose} className="absolute top-4 right-4 text-xl">
          ×
        </button>

        {/* MAIN MENU — Profile + links */}
        {activeTab === "menu" && (
          <>
            <h2 className="text-2xl font-bold mb-6">My Account</h2>

            {/* PROFILE HEADER */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold">
                {userData?.name?.charAt(0)}
              </div>

              <div>
                {!editMode ? (
                  <>
                    <h3 className="text-lg font-semibold">{userData.name}</h3>
                    <p className="text-sm text-gray-600">{userData.email}</p>
                    <p className="text-sm text-gray-600">{userData.phone}</p>
                  </>
                ) : (
                  <>
                    <input
                      className="border p-1 rounded w-full mb-1"
                      value={userData.name}
                      onChange={(e) =>
                        setUserData({ ...userData, name: e.target.value })
                      }
                    />
                    <input
                      className="border p-1 rounded w-full mb-1"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                    />
                    <input
                      className="border p-1 rounded w-full"
                      value={userData.phone}
                      onChange={(e) =>
                        setUserData({ ...userData, phone: e.target.value })
                      }
                    />
                  </>
                )}
              </div>

              {!editMode ? (
                <button
                  className="text-blue-600 text-sm"
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </button>
              ) : (
                <button className="text-green-600 text-sm" onClick={handleSaveAccount}>
                  Save
                </button>
              )}
            </div>

            {/* MENU ITEMS */}
            <div className="border-t pt-4 space-y-4">
              <MenuItem title="Orders" onClick={() => setActiveTab("orders")} />
              <MenuItem title="Address" onClick={() => setActiveTab("address")} />
              <MenuItem
                title="Notifications"
                onClick={() => setActiveTab("notifications")}
              />
            </div>

            <button className="w-full bg-red-600 text-white py-2 rounded-md mt-8">
              Logout
            </button>
          </>
        )}

        {/* ORDERS SCREEN */}
        {activeTab === "orders" && (
          <div>
            <button onClick={() => setActiveTab("menu")} className="text-xl mb-4">
              ←
            </button>
            <h2 className="text-xl font-semibold mb-4">Order History</h2>

            {orders.length === 0 ? (
              <p className="text-gray-500">No orders found</p>
            ) : (
              orders.map((o, i) => (
                <div key={i} className="border p-3 rounded mb-3">
                  <p className="font-semibold">{o.item}</p>
                  <p className="text-sm text-gray-600">₹{o.price}</p>
                  <p className="text-sm text-gray-600">{o.date}</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* ADDRESS SCREEN */}
        {activeTab === "address" && (
          <div>
            <button onClick={() => setActiveTab("menu")} className="text-xl mb-4">
              ←
            </button>
            <h2 className="text-xl font-semibold mb-3">Saved Addresses</h2>

            {addresses.map((a, i) => (
              <div key={i} className="border p-2 rounded mb-2">
                {a}
              </div>
            ))}

            <input
              className="border p-2 rounded w-full mt-2"
              placeholder="Add new address"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
            />

            <button
              onClick={saveAddress}
              className="bg-black text-white w-full py-2 rounded mt-3"
            >
              Save Address
            </button>
          </div>
        )}

        {/* NOTIFICATION SCREEN */}
        {activeTab === "notifications" && (
          <div>
            <button onClick={() => setActiveTab("menu")} className="text-xl mb-4">
              ←
            </button>
            <h2 className="text-xl font-semibold mb-3">Notifications</h2>

            {notifications.map((n, i) => (
              <div key={i} className="border p-2 rounded mb-2 text-gray-700">
                {n}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Menu Item
function MenuItem({ title, subtitle, onClick }) {
  return (
    <div className="border-b pb-3 cursor-pointer" onClick={onClick}>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">{title}</p>
          {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
        </div>
        <span className="text-xl text-gray-500">{">"}</span>
      </div>
    </div>
  );
}
