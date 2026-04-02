import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { 
  CssBaseline, 
  Box, 
  GlobalStyles, 
  Snackbar, 
  Alert, 
  Slide 
} from "@mui/material";
import HomePage from "./component/pages/HomePage";
import DashboardPage from "./component/pages/DashboardPage";
import LoginPage from "./component/pages/LoginPage";
import Logout from "./component/pages/Logout";
import TaskPage from "./component/pages/TaskPage";
import { AuthContext } from "./context/AuthContext";
import SignUp from "./component/pages/SignUp";

function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);

  if (!token) {
    window.dispatchEvent(new Event("unauthorized-access"));
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const { token } = useContext(AuthContext);
  const [notify, setNotify] = useState(false);

  useEffect(() => {
    const handleUnauthorized = () => setNotify(true);
    window.addEventListener("unauthorized-access", handleUnauthorized);
    return () => window.removeEventListener("unauthorized-access", handleUnauthorized);
  }, []);

  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: { margin: 0, padding: 0, backgroundColor: "#f8fafc" },
          "::-webkit-scrollbar": { width: "8px" },
          "::-webkit-scrollbar-thumb": { background: "#cbd5e1", borderRadius: "10px" },
        }}
      />

      <Snackbar
        open={notify}
        autoHideDuration={4000}
        onClose={() => setNotify(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={(props) => <Slide {...props} direction="down" />}
      >
        <Alert 
          onClose={() => setNotify(false)} 
          severity="error" 
          variant="filled"
          sx={{ borderRadius: 3, fontWeight: 600, boxShadow: 3 }}
        >
          Please login to access this page
        </Alert>
      </Snackbar>

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f8fafc",
          backgroundImage: `radial-gradient(at 0% 0%, hsla(215, 100%, 98%, 1) 0, transparent 50%), 
                            radial-gradient(at 100% 100%, hsla(210, 100%, 96%, 1) 0, transparent 50%)`,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={token ? <Navigate to="/" replace /> : <LoginPage />}
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<HomePage />} />
            
            <Route
              path="/dashboard"
              element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
            />
            <Route
              path="/task"
              element={<ProtectedRoute><TaskPage /></ProtectedRoute>}
            />
            <Route
              path="/logout"
              element={<ProtectedRoute><Logout /></ProtectedRoute>}
            />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </>
  );
}

export default App;