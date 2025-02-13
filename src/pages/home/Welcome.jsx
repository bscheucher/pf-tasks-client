import React, { useContext } from "react";
import { AuthContext } from "../../services/AuthContext";

function Welcome() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div>
      <p>Welcome to the Task Manager app!</p>
      {isLoggedIn && <p>You are logged in.</p>}
    </div>
  );
}

export default Welcome;
