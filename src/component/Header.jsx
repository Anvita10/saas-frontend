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
      position="static"
      elevation={2}
      sx={{
        bgcolor: "#ffffff",
        color: "#333",
        px: 2,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: Logo / Title */}
        <Typography variant="h6" fontWeight="700">
          SaaS Tech
        </Typography>

        {/* Right: Logout Button */}
        <Box>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleButton("signup")}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
            }}
          >
            Sign Up
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleButton(token ? "logout" : "login")}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
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
