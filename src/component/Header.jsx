import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useApiClient from "../hooks/useApiClient";

function Header() {
  const navigate = useNavigate();
  const [workspace, setWorkspace] = useState([]);
  const [selected, setSelected] = useState("");
  const { token } = useContext(AuthContext);
  const apiClient = useApiClient();

  useEffect(() => {
    if (!token) return;

    const getMyWorkspace = async () => {
      try {
        const res = await apiClient("/workspaces");
        if (res.success) {
          setWorkspace(res.data);
          setSelected(res.data[0]?.wsName);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getMyWorkspace();
  }, [token]);

  function handleButton(action) {
    navigate(`/${action}`);
  }

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #e2e8f0",
        color: "#0f172a",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: { xs: 2, md: 4 },
          py: 1,
        }}
      >
        {/* LEFT: LOGO */}
        <Typography
          variant="h6"
          fontWeight="800"
          sx={{
            background: "linear-gradient(90deg, #6366f1, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          ⚡ SaaS Tech
        </Typography>

        {/* RIGHT SIDE */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {!token && (
            <Button
              variant="outlined"
              onClick={() => handleButton("signup")}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                px: 3,
                borderColor: "#6366f1",
                color: "#6366f1",
                "&:hover": {
                  backgroundColor: "#eef2ff",
                },
              }}
            >
              Sign Up
            </Button>
          )}

          {/* WORKSPACE DROPDOWN */}
          {workspace.length > 0 && (
            <FormControl size="small">
              <Select
                value={selected || ""}
                onChange={handleSelect}
                displayEmpty
                sx={{
                  minWidth: 180,
                  borderRadius: 2,
                  backgroundColor: "#f8fafc",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e2e8f0",
                  },
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <WorkspacesIcon fontSize="small" />
                  </InputAdornment>
                }
              >
                {workspace.map((val) => (
                  <MenuItem key={val.id} value={val.wsName}>
                    {val.wsName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* LOGIN / LOGOUT */}
          <Button
            variant="contained"
            onClick={() => handleButton(token ? "logout" : "login")}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              background: "linear-gradient(90deg, #6366f1, #06b6d4)",
              boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
              "&:hover": {
                background: "linear-gradient(90deg, #4f46e5, #0891b2)",
              },
            }}
          >
            {token ? "Logout" : "Login"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

