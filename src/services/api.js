import axios from "axios";
import { toast } from "react-toastify";

// const BASE_URL = "http://localhost:1001/api";
const BASE_URL = "https://restuarant-backend-ffam.onrender.com/api";

// User Authentication APIs
export const registerUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, userData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, credentials, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // ✅ Allows cookies to be sent and received
    });

    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

export const logoutUser = async (token) => {
  const response = await axios.post(`${BASE_URL}/auth/logout`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};



// Menu APIs
export const getAllMenuItems = async () => {
  const response = await axios.get(`${BASE_URL}/menu`);
  return response.data;
};

export const getMenuItem = async (id) => {
  const response = await axios.get(`${BASE_URL}/menu/${id}`);
  return response.data;
};

export const addMenuItem = async (data, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/menu/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // To handle file uploads
      },
      withCredentials: true, // To send cookies (accessToken, refreshToken)
    });
    console.log('Menu item added successfully', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding menu item', error.response?.data || error.message);
    throw error;
  }
};

export const updateMenuItem = async (id, formData) => {
  try {
    // Sending a PUT request to update the menu item
    const response = await axios.put(
      `${BASE_URL}/menu/${id}`,  // Adjust the URL as per your backend
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`,  // If you are using JWT for authentication
        },
        withCredentials: true, // To send cookies (accessToken, refreshToken)
      }
    );

    console.log('Menu item updated successfully', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating menu item', error.response?.data || error.message);
  }
};


// Delete a menu item
export const deleteMenuItem = async (id, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/menu/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting menu item:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to delete menu item.");
  }
};

export const fetchOrders = async () => {
  try {
    const token = localStorage.getItem("refreshToken"); // Assuming you use JWT for auth
    if (!token) throw new Error("Unauthorized: No access token");
    const response = await axios.get(`${BASE_URL}/order`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    let token = localStorage.getItem("refreshToken");
    if (!token) throw new Error("Unauthorized: No refresh token");

    const response = await axios.put(`${BASE_URL}/order/${orderId}/status`, { status },{
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    toast.success("Order status updated successfully! ✅");
    return response.data;
  } catch (error) {
    toast.error("Failed to update order status.");
    console.error("Error updating order status:", error);
    throw error;
  }
};