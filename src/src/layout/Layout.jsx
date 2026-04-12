import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../component/Header";
import Sidebar from "../component/siderbar/Sidebar";

// Centralizing width for consistency
const SIDEBAR_WIDTH = 260;

function Layout() {
  const location = useLocation();

  // Sidebar only appears when inside a workspace context
  const isWorkspaceRoute = location.pathname.includes("/workspace/");

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      {/* Sidebar - Positioned fixed or drawer depending on your Sidebar implementation */}
      {isWorkspaceRoute && (
        <Box
          component="nav"
          sx={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            display: { xs: "none", md: "block" }, // Responsive hide
          }}
        >
          <Sidebar width={SIDEBAR_WIDTH} />
        </Box>
      )}

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          // Calculate width based on sidebar presence
          width: isWorkspaceRoute
            ? { md: `calc(100% - ${SIDEBAR_WIDTH}px)` }
            : "100%",
          transition: "width 0.2s ease-in-out",
        }}
      >
        {/* Header - Stays sticky or at top */}
        <Header />

        {/* Page Content Container */}
        <Box
          sx={{
            p: { xs: 2, md: 4 }, // Responsive padding
            flexGrow: 1,
            // Subtle top border to separate from header if header is white
            borderTop: "1px solid",
            borderColor: "divider",
            bgcolor: "#f8fafc", // Brand slate background
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
