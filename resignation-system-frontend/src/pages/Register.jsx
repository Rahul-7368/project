import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting register request:", formData); 

    if (!formData.username || !formData.password) {
        alert("Username and password are required!");
        return;
    }

    try {
        await axios.post("http://localhost:8080/api/auth/register", formData, {
            headers: { "Content-Type": "application/json" }
        });
        alert("Registered successfully");
        navigate("/login");
    } catch (error) {
        console.error("Registration failed:", error.response ? error.response.data : error.message);
        alert("Registration failed!");
    }
};

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
        //   autoComplete="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
        //   autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
