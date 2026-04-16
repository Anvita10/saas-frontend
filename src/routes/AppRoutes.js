import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../component/auth/LoginPage";
import Logout from "../component/auth/Logout";
import TaskPage from "../component/task/TaskPage";
import SignUp from "../component/auth/SignUp";
import Layout from "../layout/Layout";
import WorkspaceDetail from "../component/workspace/WorkspaceDetail";
import Dashboard from "../component/dashboard/Dashboard";
import WorkspaceSettings from "../component/workspace/WorkspaceSettings";
import LandingPage from "../component/landing/LandingPage";
import AnalysisSection from "../component/analysis/AnalysisSection";
import TrendComparisonSection from "../component/analysis/TrendComparisonSection";

function AppRoutes() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/login"
        element={token ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />
      <Route path="/signup" element={<SignUp />} />

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
          path="/workspace/:workspaceId/analysis"
          element={
            <ProtectedRoute>
              <AnalysisSection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workspace/:workspaceId/comparison"
          element={
            <ProtectedRoute>
              <TrendComparisonSection />
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

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
