import React from "react";
import "./navfoot.css";

function Footer() {
  return (
    <footer className="text-center py-3 foot">
      <p>&copy; {new Date().getFullYear()} Bernhard Scheucher</p>
    </footer>
  );
}

export default Footer;
