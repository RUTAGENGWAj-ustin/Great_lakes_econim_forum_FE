import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form onSubmit={handleLogin} className="p-6 shadow-lg rounded-md bg-white">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 mb-3 w-full"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-3 w-full"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-green-500 text-white p-2 w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
