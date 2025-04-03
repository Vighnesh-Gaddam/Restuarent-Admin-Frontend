import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
