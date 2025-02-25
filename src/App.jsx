import { Routes, Route } from "react-router-dom";
import Footer from "./components/shared/Footer";
import NavBar from "./components/shared/NavBar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import UserProfile from "./pages/profile/UserProfile";
import UpdateUserPage from "./pages/profile/UpdateUserPage";
import ProtectedRoute from "./services/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import KanbanBoard from "./pages/KanbanBoard";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NavBar />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/kanban/:boardId"
            element={
              <ProtectedRoute>
                <KanbanBoard />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:id/update"
            element={
              <ProtectedRoute>
                <UpdateUserPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;
