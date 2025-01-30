import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      login(res.data.token); // Store the token in AuthContext or localStorage
      alert("Login successful");
      navigate("/donate"); // Redirect to DonateBlood page after login
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input 
        type="email" 
        placeholder="Email" 
        onChange={(e) => setForm({ ...form, email: e.target.value })} 
        required 
      />
      <input 
        type="password" 
        placeholder="Password" 
        onChange={(e) => setForm({ ...form, password: e.target.value })} 
        required 
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
