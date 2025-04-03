/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/api";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logoutUser();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        toast.success("Logged out successfully!");

        navigate("/"); // Redirect to login page
      } catch (error) {
        toast.error("Logout failed. Try again!");
      }
    };

    handleLogout();
  }, [navigate]);

  return <div className="text-center mt-10 text-lg">Logging out...</div>;
};

export default Logout;
