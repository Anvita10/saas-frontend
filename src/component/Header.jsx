import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/logout");
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
            onClick={handleLogout}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
