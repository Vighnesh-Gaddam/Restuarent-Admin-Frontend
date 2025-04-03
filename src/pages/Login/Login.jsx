/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Access login function from context

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({ email, password });
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      // Call the login function from context to update the auth state
      login();

      toast.success("Login successful!", { position: "top-right" });

      setTimeout(() => {
        navigate("/menu"); // Redirect after success
      }, 1500);
    } catch (err) {
      toast.error("Invalid email or password!", { position: "top-right" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-3 w-80">
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
