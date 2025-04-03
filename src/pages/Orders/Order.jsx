import { useEffect, useState } from "react";
import { fetchOrders, updateOrderStatus } from "../../services/api";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      const response = await fetchOrders();
      if (response && response.data) {
        setOrders(response.data);
      } else {
        setOrders([]);
      }
      setLoading(false);
    };
    getOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus);
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Orders</h2>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {orders.map((order) => (
          <div key={order._id} className="p-4 border rounded-lg shadow-md bg-white max-w-xl mx-auto">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Order #{order._id.slice(-6)}</h3>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  order.status === "processing"
                    ? "bg-yellow-200 text-yellow-800"
                    : order.status === "completed"
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">Placed on: {new Date(order.createdAt).toLocaleString()}</p>
            <p className="text-sm text-gray-600">Payment: {order.paymentStatus.toUpperCase()}</p>
            <div className="mt-3 border-t pt-3">
              <p className="text-sm font-medium">Customer:</p>
              <p className="text-sm text-gray-700">{order.userId.name} ({order.userId.email})</p>
            </div>
            <div className="mt-3 border-t pt-3">
              <p className="text-sm font-medium">Items:</p>
              {order.items.map((item) => (
                <div key={item.menuItemId._id} className="flex items-center gap-3 py-1">
                  <img src={item.menuItemId.foodImage} alt={item.menuItemId.name} className="w-10 h-10 rounded" />
                  <p className="text-sm">{item.menuItemId.name} (x{item.quantity})</p>
                </div>
              ))}
            </div>
            <div className="mt-3 border-t pt-3 flex justify-between items-center">
              <p className="text-lg font-bold">Total: ₹{order.totalPrice}</p>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="p-1 border rounded bg-gray-100"
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

export default Order;
