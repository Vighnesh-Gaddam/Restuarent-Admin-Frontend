import React, { useEffect, useState } from "react";
import { fetchOrders, updateOrderStatus } from "../api";

const AdminOrderCard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();

    // Refresh time remaining every minute
    const interval = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order.status === "processing" && order.estimatedTimeRemaining > 0) {
            return {
              ...order,
              estimatedTimeRemaining: order.estimatedTimeRemaining - 60000,
            };
          }
          return order;
        })
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const loadOrders = async () => {
    try {
      const data = await fetchOrders();
      setOrders(data.data);
    } catch (error) {
      console.error("Failed to load orders", error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      loadOrders(); // Refresh orders after updating status
    } catch (error) {
      console.error("Error updating order status", error);
    }
  };

  const formatTime = (ms) => {
    if (ms <= 0) return "Completed";
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const formatETA = (ms) => {
    if (ms <= 0) return "Order completed";
    const eta = new Date(Date.now() + ms);
    return eta.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Orders Panel</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="p-5 border rounded-2xl shadow-xl bg-white hover:shadow-2xl transition-all duration-300"
          >
            <div className="mb-4">
              <p className="font-bold text-lg">🧾 Order ID:</p>
              <p className="text-gray-700 break-all">{order._id}</p>
            </div>

            <div className="mb-2 text-gray-800">
              👤 <strong>{order.userId.name}</strong> ({order.userId.email})
            </div>
            <p className="text-gray-600">💰 Total: ₹{order.totalPrice}</p>
            <p className="text-gray-600">💳 Payment: {order.paymentStatus}</p>

            {order.status === "processing" && (
              <div className="text-sm text-blue-600 mt-2 font-medium space-y-1">
                <p>⏳ Time Remaining: {formatTime(order.estimatedTimeRemaining)}</p>
                <p>🕒 Ready by: {formatETA(order.estimatedTimeRemaining)}</p>
              </div>
            )}

            <div className="mt-3">
              <p className="font-semibold mb-1">🧂 Items:</p>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 p-2 border rounded-lg bg-gray-50"
                  >
                    <img
                      src={item.menuItemId.foodImage}
                      alt={item.menuItemId.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.menuItemId.name}</p>
                      <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label className="block font-semibold mb-1">📦 Status:</label>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="mt-1 p-2 border rounded w-full bg-gray-100 focus:outline-none"
              >
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrderCard;
