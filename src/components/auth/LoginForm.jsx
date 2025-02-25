import React from "react";

function LoginForm({ credentials, onChange, onSubmit, error, successMessage }) {
  return (
    <form
      onSubmit={onSubmit}
      className="mt-4 p-4 border rounded shadow-sm bg-light"
    >
      {/* <h2 className="mb-3 text-center">Login</h2> */}

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          value={credentials.email}
          onChange={onChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-control"
          value={credentials.password}
          onChange={onChange}
          required
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      <button type="submit" className="btn btn-primary w-100">
        Login
      </button>

      <div className="text-center mt-3">
        <small className="text-muted">
          No account? Use guest login: <br />
          <strong>Email:</strong> guest@email.com <br />
          <strong>Password:</strong> L0sp1t3
        </small>
      </div>
    </form>
  );
}

export default LoginForm;
