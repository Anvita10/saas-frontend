import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import CreateWorkspace from "../workspace/CreateWorkspace";
import { AuthContext } from "../../context/AuthContext";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { token } = useContext(AuthContext);

  const menuItems = [
    { id: 1, title: "Dashboard", path: "/dashboard" },
    { id: 2, title: "Task", path: "/task" },
    { id: 3, title: "Settings", path: "/settings" },
  ];

  function handleClick(path) {
    navigate(path);
  }

  return (
    <>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            border: "none",
            background: "linear-gradient(180deg, #0f172a, #1e293b)",
            color: "#fff",
            padding: "16px 12px",
          },
        }}
      >
        <Box sx={{ mb: 4, px: 1 }}>
          <Typography
            variant="h6"
            fontWeight="800"
            sx={{
              background: "linear-gradient(90deg, #22d3ee, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ⚡ TaskFlow
          </Typography>

          <Button
            fullWidth
            size="small"
            onClick={() => setOpen(true)}
            sx={{
              mt: 1,
              textTransform: "none",
              borderRadius: 2,
              color: "#a78bfa",
              border: "1px dashed rgba(167,139,250,0.5)",
            }}
            disabled={!token}
          >
            + Create Workspace
          </Button>
        </Box>

        <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)", my: 2 }} />

        <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <ListItemButton
                key={item.id}
                onClick={() => handleClick(item.path)}
                sx={{
                  borderRadius: "12px",
                  px: 2,
                  py: 1.2,
                  transition: "all 0.25s ease",

                  bgcolor: isActive ? "rgba(99,102,241,0.2)" : "transparent",

                  "&:hover": {
                    bgcolor: "rgba(99,102,241,0.15)",
                    transform: "translateX(4px)",
                  },
                }}
              >
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontSize: "0.95rem",
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>

        <Box
          sx={{
            mt: "auto",
            p: 2,
            borderRadius: 3,
            background: "rgba(255,255,255,0.05)",
          }}
        >
          <Typography variant="body2" fontWeight="600">
            👋 Welcome
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            Stay productive 🚀
          </Typography>
        </Box>
      </Drawer>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Create Workspace</DialogTitle>

        <DialogContent>
          <CreateWorkspace onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Sidebar;
