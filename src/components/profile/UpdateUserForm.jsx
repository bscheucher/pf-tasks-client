import React from "react";

const UpdateUserForm = ({ formData, errors, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          value={formData.username}
          onChange={onChange}
          placeholder="Enter new username"
        />
        {errors.username && <small className="text-danger">{errors.username}</small>}
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="Enter new email"
        />
        {errors.email && <small className="text-danger">{errors.email}</small>}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={formData.password}
          onChange={onChange}
          placeholder="Enter new password"
        />
        {errors.password && <small className="text-danger">{errors.password}</small>}
      </div>
      <button type="submit" className="btn btn-primary">
        Update
      </button>
    </form>
  );
};

export default UpdateUserForm;
