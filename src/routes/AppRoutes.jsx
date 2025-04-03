import { Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import Order from "../pages/Orders/Order";
import Menu from "../pages/Menu/Menu";
import History from "../pages/History/History";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ProtectedRoute from "../components/ProtectedRoute"; // Import the ProtectedRoute

const AppRoutes = () => {
  return (
    <Routes>
      {/* Define a parent route that wraps all pages with Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="menu" element={<Menu />} />
          <Route path="order" element={<Order />} />
          <Route path="history" element={<History />} />
        </Route>
      </Route>

      {/* Error Page */}
      <Route path="*" element={<h1>Error 404</h1>} />
    </Routes>
  );
};

export default AppRoutes;
