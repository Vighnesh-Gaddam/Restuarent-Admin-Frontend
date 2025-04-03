import React, { useEffect, useState } from "react";
import { fetchOrders, updateOrderStatus } from "../api";

const AdminOrderCard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
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

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Admin Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order._id} className="p-4 border rounded-lg shadow-lg bg-white">
            <p className="font-bold text-lg">Order ID: {order._id}</p>
            <p className="text-gray-700">User: {order.userId.name} ({order.userId.email})</p>
            <p className="text-gray-700">Total Price: ₹{order.totalPrice}</p>
            <p className="text-gray-700">Payment Status: {order.paymentStatus}</p>
            <div className="mt-2">
              <p className="font-semibold">Items:</p>
              {order.items.map((item) => (
                <div key={item._id} className="flex items-center gap-4 mt-2 border p-2 rounded-lg">
                  <img src={item.menuItemId.foodImage} alt={item.menuItemId.name} className="w-14 h-14 object-cover rounded" />
                  <div>
                    <p>{item.menuItemId.name}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <p className="font-semibold">Status:</p>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="mt-2 p-2 border rounded w-full bg-gray-100"
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
