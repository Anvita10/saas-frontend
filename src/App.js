import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  GlobalStyles,
} from "@mui/material";

// Context & Pages
import { AuthContext } from "./context/AuthContext";
import LoginPage from "./component/pages/LoginPage";
import Logout from "./component/pages/Logout";
import TaskPage from "./component/pages/TaskPage";
import SignUp from "./component/pages/SignUp";
import Layout from "./layout/Layout";
import WorkspaceDetail from "./component/workspace/WorkspaceDetail";
import LandingPage from "./component/pages/LandingPage";
import Dashboard from "./component/pages/Dashboard";
import WorkspaceSettings from "./component/workspace/WorkspaceSettings";

// 1. Updated Premium Theme Configuration (Navy & Teal)
const theme = createTheme({
  palette: {
    primary: {
      main: "#1db5c7", // Brand Teal
      dark: "#0f172a", // Brand Navy
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#0f172a", // Navy for contrast
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a", // Deep Navy text instead of grey
      secondary: "#64748b",
    },
  },
  shape: {
    borderRadius: 16, // Consistent with our Login/Signup cards
  },
  typography: {
    // Ensuring the "Inter" look across the app
    fontFamily: "'Inter', 'Plus Jakarta Sans', sans-serif",
    h1: { fontWeight: 900, letterSpacing: "-0.04em" },
    h4: { fontWeight: 800, letterSpacing: "-0.02em" },
    h6: { fontWeight: 700, letterSpacing: "0.02em" },
    button: {
      textTransform: "none",
      fontWeight: 700,
      letterSpacing: "0.01em",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "12px 28px",
          borderRadius: 12,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-1px)",
          },
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #0f172a 0%, #1db5c7 100%)",
          boxShadow: "0 8px 16px -4px rgba(29, 181, 199, 0.3)",
          "&:hover": {
            background: "linear-gradient(135deg, #1e293b 0%, #22d3ee 100%)",
            boxShadow: "0 12px 20px -4px rgba(29, 181, 199, 0.4)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none", // Removes MUI's default dark mode overlay
        },
        elevation1: {
          boxShadow: "0 4px 20px -2px rgba(15, 23, 42, 0.05)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            backgroundColor: "#fcfdfe",
          },
        },
      },
    },
  },
});

// 2. Auth Guard
function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  const { token } = useContext(AuthContext);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: "#f8fafc",
            margin: 0,
            padding: 0,
            overflowX: "hidden",
          },
          // Updated scrollbar to match Teal theme
          "::-webkit-scrollbar": { width: "10px" },
          "::-webkit-scrollbar-track": { background: "#f1f5f9" },
          "::-webkit-scrollbar-thumb": {
            background: "#cbd5e1",
            borderRadius: "10px",
            border: "2px solid #f1f5f9",
          },
          "::-webkit-scrollbar-thumb:hover": { background: "#1db5c7" },
        }}
      />

      <Box sx={{ minHeight: "100vh" }}>
        <BrowserRouter>
          <Routes>
            {/* Public Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Auth Routes */}
            <Route
              path="/login"
              element={
                token ? <Navigate to="/dashboard" replace /> : <LoginPage />
              }
            />
            <Route path="/signup" element={<SignUp />} />

            {/* Authenticated Application Routes */}
            <Route element={<Layout />}>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/workspace/:workspaceId"
                element={
                  <ProtectedRoute>
                    <WorkspaceDetail />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/workspace/:workspaceId/tasks"
                element={
                  <ProtectedRoute>
                    <TaskPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/workspace/:workspaceId/setting"
                element={
                  <ProtectedRoute>
                    <WorkspaceSettings />
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
              />
            </Route>

            {/* Catch-all Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
