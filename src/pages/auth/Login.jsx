import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../routes/authRoutes";
import { AuthContext } from "../../context/AuthContext";
import LoginForm from "../../components/auth/LoginForm";

function Login() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await loginUser(credentials);
      setSuccessMessage(response.data.message);
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      console.log(
        "Token in local storage, logged in Login.jsx",
        localStorage.getItem("token")
      );
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="container mt-5">
      <h2>Log in and get started!</h2>
      <LoginForm
        credentials={credentials}
        onChange={handleChange}
        onSubmit={handleSubmit}
        error={error}
        successMessage={successMessage}
      />
    </div>
  );
}

export default Login;
