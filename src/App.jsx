import { Routes, Route } from "react-router-dom";
import Footer from "./components/shared/Footer";
import NavBar from "./components/shared/NavBar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Welcome from "./pages/home/Welcome";
import UserProfile from "./pages/profile/UserProfile";
import UpdateUserPage from "./pages/profile/UpdateUserPage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/users/:id/update" element={<UpdateUserPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
