import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth(); // Get the authentication status
  const hasShownToast = useRef(false); // Ref to track if toast has already been shown

  useEffect(() => {
    if (!isAuthenticated && !hasShownToast.current) {
      toast.error("You must be logged in to access this page!", {
        position: "top-right",
        autoClose: 3000,
      });
      hasShownToast.current = true; // Mark toast as shown
    }
  }, [isAuthenticated]); // Only show toast when isAuthenticated changes

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // Allow access to the child routes if authenticated
};

export default ProtectedRoute;
