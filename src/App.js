import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import HomePage from "./component/pages/HomePage";
import DashboardPage from "./component/pages/DashboardPage";
import LoginPage from "./component/pages/LoginPage";
import Logout from "./component/pages/Logout";
import TaskPage from "./component/pages/TaskPage";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/" replace />;
}

function App() {
  const { token } = useContext(AuthContext);
  return (
    <>
      <CssBaseline />
      <Box sx={{ bgcolor: "#f5f6fa", minHeight: "100vh" }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={token ? <Navigate to="/Home" replace /> : <LoginPage />}
            />
            <Route
              path="/Home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/task"
              element={
                <ProtectedRoute>
                  <TaskPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/logout"
              element={
                <ProtectedRoute>
                  <Logout />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </Box>
    </>
  );
}

export default App;
