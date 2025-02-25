import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem("token");
    console.log("Token in AuthContext", token);
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  });
  console.log("isLoggedin in AutContext", isLoggedIn);

  const [userId, setUserId] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return "";
    try {
      const decoded = jwtDecode(token);
      return decoded.id || "";
    } catch {
      return "";
    }
  });
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUserId(decoded.id || "");
          setIsLoggedIn(true);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Error decoding token:", error.message);
        logout();
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]); // <-- Trigger effect when isLoggedIn changes

  const logout = () => {
    localStorage.removeItem("token");
    setUserId("");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userId, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
