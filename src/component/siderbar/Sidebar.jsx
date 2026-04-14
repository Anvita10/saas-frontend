import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
  ListItemIcon,
  Avatar,
  useTheme,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SettingsIcon from "@mui/icons-material/Settings";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { workspaceId } = useParams();
  const theme = useTheme();

  const menuItems = [
    {
      id: 0,
      title: "Dashboard",
      path: "/dashboard",
      icon: <DashboardIcon sx={{ fontSize: 20 }} />,
      visible: true,
    },
    {
      id: 1,
      title: "Overview",
      path: `/workspace/${workspaceId}`,
      icon: <BarChartIcon sx={{ fontSize: 20 }} />,
      visible: !!workspaceId, // Only show if inside a workspace
    },
    {
      id: 2,
      title: "Tasks",
      path: `/workspace/${workspaceId}/tasks`,
      icon: <AssignmentIcon sx={{ fontSize: 20 }} />,
      visible: !!workspaceId,
    },
    {
      id: 3,
      title: "Settings",
      path: `/workspace/${workspaceId}/setting`,
      icon: <SettingsIcon sx={{ fontSize: 20 }} />,
      visible: !!workspaceId,
    },
  ];

  return (
    <>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 260, // Slightly wider for better breathing room
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 260,
            boxSizing: "border-box",
            border: "none",
            background: theme.tokens.gradients.hero,
            color: "#fff",
            padding: "24px 16px",
          },
        }}
      >
        {/* 🔝 LOGO SECTION */}
        <Box sx={{ mb: 4, px: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              fontSize: "1.25rem",
              letterSpacing: "-0.02em",
              color: "#22d3ee",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
            onClick={() => navigate("/dashboard")}
          >
            TaskFlow
          </Typography>

          {workspaceId && (
            <Box
              sx={{
                mt: 3,
                p: 1.5,
                bgcolor: "rgba(255,255,255,0.03)",
                borderRadius: 2,
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255,255,255,0.6)",
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                ACTIVE WORKSPACE
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#22d3ee", noWrap: true }}
              >
                ID: {workspaceId.slice(-6)}...
              </Typography>
            </Box>
          )}
        </Box>

        {/* 📌 NAVIGATION MENU */}
        <List sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {menuItems
            .filter((item) => item.visible)
            .map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <ListItemButton
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderRadius: "10px",
                    px: 2,
                    py: 1.2,
                    transition: "all 0.2s ease",
                    bgcolor: isActive
                      ? "rgba(29, 181, 199, 0.15)"
                      : "transparent",
                    color: isActive ? "#22d3ee" : "rgba(255,255,255,0.75)",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.05)",
                      color: "#fff",
                      "& .MuiListItemIcon-root": { color: "#fff" },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 36,
                      color: isActive ? "#22d3ee" : "inherit",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      fontSize: "0.9rem",
                      fontWeight: isActive ? 700 : 500,
                    }}
                  />
                </ListItemButton>
              );
            })}
        </List>

        {/* 👇 USER FOOTER */}
        <Box
          sx={{
            mt: "auto",
            p: 2,
            borderRadius: 3,
            bgcolor: "rgba(255,255,255,0.03)",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              fontSize: "0.85rem",
              fontWeight: 800,
              bgcolor: "#1db5c7",
            }}
          >
            {user?.charAt(0) || "U"}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, noWrap: true, color: "#f8fafc" }}
            >
              {user || "User"}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.6)", display: "block" }}
            >
              Free Tier
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default Sidebar;

