import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  function handleButton(action) {
    navigate(`/${action}`);
  }

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
        {/* Left: Logo */}
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

        {/* Right: Actions */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {!token && (
            <Button
              variant="outlined"
              onClick={() => handleButton("signup")}
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                px: 3,
                borderColor: "#6366f1",
                color: "#6366f1",
                "&:hover": {
                  backgroundColor: "#eef2ff",
                  borderColor: "#6366f1",
                },
              }}
            >
              Sign Up
            </Button>
          )}

          <Button
            variant="contained"
            onClick={() => handleButton(token ? "logout" : "login")}
            sx={{
              textTransform: "none",
              borderRadius: "10px",
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
