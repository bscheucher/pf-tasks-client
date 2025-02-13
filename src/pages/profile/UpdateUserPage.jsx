import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../services/AuthContext";
import { getUserById, updateUser } from "../../routes/authRoutes";
import useValidation from "../../services/Validation";
import UpdateUserForm from "../../components/profile/UpdateUserForm";

const UpdateUserPage = () => {
  const { userId: authUserId } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { errors, validate, validateForm } = useValidation();

  useEffect(() => {
    if (!authUserId || authUserId.toString() !== id) {
      navigate("/login"); // Redirect if not authorized
      return;
    }

    const fetchUser = async () => {
      try {
        const { data } = await getUserById(id);
        setFormData({
          username: data.username,
          email: data.email,
          password: "",
        });
      } catch (err) {
        console.error("Error fetching user data:", err.message);
        setError("Failed to load user data.");
      }
    };

    fetchUser();
  }, [id, authUserId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validate(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(formData)) return;
    setError("");
    setSuccess("");

    try {
      const updatedUserData = {
        ...(formData.username && { username: formData.username }),
        ...(formData.email && { email: formData.email }),
        ...(formData.password && { password: formData.password }),
      };

      if (Object.keys(updatedUserData).length === 0) {
        setError("Please fill at least one field to update.");
        return;
      }

      const response = await updateUser(id, updatedUserData);

      if (response.status === 200) {
        setSuccess("User updated successfully!");
        setTimeout(() => navigate(`/user`), 1500); // Redirect after success
      }
    } catch (err) {
      console.error("Error updating user:", err.message);

      const errorMessage =
        typeof err.response?.data === "string"
          ? err.response.data
          : err.response?.data?.errors
          ? JSON.stringify(err.response.data.errors)
          : "An error occurred while updating.";

      setError(errorMessage);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update User</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <UpdateUserForm
        formData={formData}
        errors={errors}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UpdateUserPage;
