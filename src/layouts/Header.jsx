import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, ShoppingBag, Clock } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext"; // Import the custom hook

const LogoutModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-[#36415320] backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <h3 className="text-xl font-semibold mb-4">{message}</h3>
        <div className="flex justify-between">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-full"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded-full"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const { isAuthenticated, logout } = useAuth(); // Get auth context
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsModalOpen(true); // Show the modal when user clicks logout
  };

  const handleConfirmLogout = () => {
    logout(); // Call the logout function from context

    // Show success message
    toast.success("Logged out successfully!");

    setIsModalOpen(false); // Close the modal
    navigate("/"); // Redirect to login page
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false); // Close the modal if user cancels
  };

  return (
    <div className="w-full h-18 px-4 py-2 flex justify-center items-center border-b-2 shadow-xl bg-gray-100">
      {/* Logo (Centered) */}
      <NavLink to="/menu" className="flex-shrink-0">
        <img src="/Logo2.svg" alt="Logo" className="h-10 mx-auto" />
      </NavLink>

      {/* Navigation (Centered) */}
      <div className="flex gap-8 justify-center flex-1">
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            `flex items-center ${isActive ? "text-blue-600" : "text-gray-700"
            } hover:text-blue-600 transition duration-200`
          }
        >
          <Menu size={20} className="mr-1" /> Menu
        </NavLink>

        <NavLink
          to="/order"
          className={({ isActive }) =>
            `flex items-center ${isActive ? "text-blue-600" : "text-gray-700"
            } hover:text-blue-600 transition duration-200`
          }
        >
          <ShoppingBag size={20} className="mr-1" /> Order
        </NavLink>

        {/* <NavLink
          to="/history"
          className={({ isActive }) =>
            `flex items-center ${isActive ? "text-blue-600" : "text-gray-700"
            } hover:text-blue-600 transition duration-200`
          }
        >
          <Clock size={20} className="mr-1" /> History
        </NavLink> */}
      </div>

      {/* Authentication Buttons (Centered) */}
      <div className="flex-shrink-0">
        {isAuthenticated ? (
          <button
            className="bg-blue-500 group hover:translate-y-[-2px] flex space-x-2 transition-all duration-150 ease-in-out hover:bg-blue-600 shadow-md shadow-blue-700 rounded-full px-4 py-1 text-black"
            onClick={handleLogout}
          >
            <span className="group-hover:text-white">Logout</span>
            <span className="group-hover:hidden">🔒</span>
            <span className="group-hover:block hidden">🔓</span>
          </button>
        ) : (
          <NavLink
            to="/"
            className="bg-blue-500 group hover:translate-y-[-2px] flex space-x-2 transition-all duration-150 ease-in-out hover:bg-blue-600 shadow-md shadow-blue-700 rounded-full px-4 py-1 text-black mr-3"
          >
            <span className="group-hover:text-white">Login</span>
            <span className="group-hover:hidden">🔓</span>
            <span className="group-hover:block hidden">🔒</span>
          </NavLink>
        )}
      </div>

      {/* Modal (only visible when the state isModalOpen is true) */}
      {isModalOpen && (
        <LogoutModal
          message="Are you sure you want to log out?"
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}
    </div>
  );
};

export default Header;
