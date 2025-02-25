// components/LoadingIndicator.js
import "./LoadingIndicator.css";
import React from "react";

function LoadingIndicator() {
  return (
    <div className="loading-indicator">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

export default LoadingIndicator;
