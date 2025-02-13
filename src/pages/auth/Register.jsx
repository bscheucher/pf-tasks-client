import React, { useState } from "react";
import { registerUser } from "../../routes/authRoutes";
import { useNavigate } from "react-router-dom";
import useValidation from "../../services/Validation";
import RegisterForm from "../../components/auth/RegisterForm";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(null);
  const { errors, validate, validateForm } = useValidation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validate(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(formData)) return;
    try {
      await registerUser(formData);
      setMessage("Registration successful!");
      setFormData({ username: "", email: "", password: "" });
      setTimeout(() => navigate(`/`), 1500);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h2 className="text-center mb-4">Register</h2>
          {message && <div className="alert alert-info">{message}</div>}
          <RegisterForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
