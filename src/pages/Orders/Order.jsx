import { useEffect, useState } from "react";
import { fetchOrders, updateOrderStatus } from "../../services/api";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeInputs, setTimeInputs] = useState({});

  useEffect(() => {
    const getOrders = async () => {
      const response = await fetchOrders();
      console.log("Fetched Orders:", response); // Debugging
      if (response && response.data) {
        setOrders(
          response.data.map((order) => ({
            ...order,
            estimatedTimeRemaining: order.estimatedTimeRemaining || 0,
          }))
        );
      } else {
        setOrders([]);
      }
      setLoading(false);
    };

    getOrders();

    const interval = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order.status === "processing" && order.estimatedTimeRemaining > 0) {
            const newTime = order.estimatedTimeRemaining - 60000;
            if (newTime <= 0) {
              updateOrderStatus(order._id, { status: "completed", estimatedTimeInMinutes: 0 });
              return { ...order, status: "completed", estimatedTimeRemaining: 0 };
            }
            return { ...order, estimatedTimeRemaining: newTime };
          }
          return order;
        })
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const estimatedTimeInMinutes = parseInt(timeInputs[orderId]) || 0;
    const estimatedTimeInMs = estimatedTimeInMinutes * 60 * 1000;

    try {
      const response = await updateOrderStatus(orderId, {
        status: newStatus,
        estimatedTimeInMinutes: newStatus === "processing" ? estimatedTimeInMinutes : 0,
      });

      if (response.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? {
                ...order,
                status: newStatus,
                estimatedTimeRemaining: newStatus === "processing" ? estimatedTimeInMs : 0,
              }
              : order
          )
        );
      }
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const formatTime = (ms) => {
    if (ms <= 0) return "✅ Completed (0m)";
    if (ms < 60000) return `${Math.floor(ms / 1000)}s`;
    return `${Math.floor(ms / 60000)}m`;
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Orders</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {orders.map((order) => (
          <div key={order._id} className="p-4 border rounded-lg shadow-md bg-white relative">
            {/* Status in Top Right */}
            <span
              className={`absolute top-2 right-2 px-3 py-1 text-sm font-medium rounded-full ${order.status === "processing"
                ? "bg-yellow-200 text-yellow-800"
                : order.status === "completed"
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
                }`}
            >
              {order.status}
            </span>

            {/* Customer Details */}
            <div className="mb-3">
              <h3 className="text-lg font-bold text-blue-700">{order.userId.name}</h3>
              <p className="text-sm text-gray-600">{order.userId.email}</p>
            </div>

            {/* Items with Fixed Height and Scroll */}
            {/* Items with Fixed Height and Scroll */}
            <div className="mt-3 border-t pt-3 h-48 overflow-auto">
              <p className="text-sm font-medium">Items:</p>
              {order.items.map((item) => (
                item.menuItemId ? (
                  <div key={item.menuItemId._id} className="flex items-center gap-3 py-1">
                    <img src={item.menuItemId.foodImage} alt={item.menuItemId.name} className="w-10 h-10 rounded" />
                    <p className="text-sm">{item.menuItemId.name} (x{item.quantity})</p>
                  </div>
                ) : (
                  // Skeleton Loader
                  <div key={item._id} className="flex items-center gap-3 py-1 animate-pulse">
                    <div className="w-10 h-10 bg-gray-300 rounded"></div>
                    <div className="flex flex-col gap-1">
                      <div className="w-24 h-4 bg-gray-300 rounded"></div>
                      <div className="w-16 h-3 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                )
              ))}
            </div>


            {/* Order Details */}
            <p className="mt-2 text-sm text-blue-600 font-medium">⏳ Time Remaining: {formatTime(order.estimatedTimeRemaining)}</p>
            <p className="text-sm text-gray-600">Placed on: {new Date(order.createdAt).toLocaleString()}</p>
            <p className="text-sm text-gray-600">Payment: {order.paymentStatus.toUpperCase()}</p>

            {/* Total & Controls */}
            <div className="mt-3 border-t pt-3 flex flex-col gap-2">
              <p className="text-lg font-bold">Total: ₹{order.totalPrice}</p>

              <div className="mt-3 border-t pt-3 flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Set time (mins)"
                  className="p-2 border rounded w-1/3 text-[8px] sm:text-sm"
                  value={timeInputs[order._id] || ""}
                  onChange={(e) => setTimeInputs({ ...timeInputs, [order._id]: e.target.value })}
                />
                <button
                  onClick={() => handleStatusChange(order._id, "processing")}
                  className="px-1 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Update Time
                </button>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="p-2 border rounded bg-gray-100 w-1/3"
                >
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
