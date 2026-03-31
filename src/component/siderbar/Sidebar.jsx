import { useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";

function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { id: 1, title: "Dashboard", path: "/dashboard" },
    { id: 2, title: "Task", path: "/task" },
    { id: 3, title: "Settings", path: "/settings" },
  ];

  function handleClick(path) {
    navigate(path);
  }

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 220,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 220,
          boxSizing: "border-box",
          bgcolor: "#1e293b",
          color: "#fff",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          My App
        </Typography>
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.id}
            onClick={() => handleClick(item.path)}
            sx={{
              "&:hover": {
                bgcolor: "#334155",
                cursor: "pointer",
              },
            }}
          >
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
