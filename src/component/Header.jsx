import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Avatar,
  Stack,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";

function Header() {
  const navigate = useNavigate();
  const { token, user } = useAuth();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid",
        borderColor: "divider",
        color: "#0f172a",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: { xs: 2, md: 4 },
          minHeight: 70,
        }}
      >
        {/* LOGO - Updated to Taskly Flow */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 900,
            letterSpacing: "-0.05em",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: "1.4rem",
          }}
          onClick={() => navigate("/")}
        >
          <Box
            component="span"
            sx={{
              background: "linear-gradient(135deg, #0f172a 0%, #1db5c7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Taskly
          </Box>
          <Box component="span" sx={{ color: "#1db5c7" }}>
            Flow
          </Box>
        </Typography>

        {/* RIGHT SIDE */}
        <Box display="flex" alignItems="center">
          {token ? (
            <Stack direction="row" alignItems="center" spacing={3}>
              {/* USER PROFILE */}
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: "text.primary",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  {user}
                </Typography>
                <Tooltip title="Account Settings">
                  <Avatar
                    sx={{
                      width: 38,
                      height: 38,
                      bgcolor: "#3454a0",
                      border: "2px solid #1db5c7",
                      fontSize: 14,
                      fontWeight: 800,
                      cursor: "pointer",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  >
                    {user?.charAt(0)?.toUpperCase() || "U"}
                  </Avatar>
                </Tooltip>
              </Stack>

              {/* LOGOUT - Styled to match current brand theme */}
              <Button
                variant="outlined"
                size="small"
                startIcon={<LogoutIcon sx={{ fontSize: 18 }} />}
                onClick={() => navigate("/logout")}
                sx={{
                  textTransform: "none",
                  borderRadius: 2.5,
                  px: 2,
                  py: 0.8,
                  fontWeight: 700,
                  color: "#0f172a",
                  borderColor: "#e2e8f0",
                  "&:hover": {
                    borderColor: "#1db5c7",
                    bgcolor: "rgba(29, 181, 199, 0.04)",
                    color: "#1db5c7",
                  },
                }}
              >
                Logout
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2}>
              <Button
                onClick={() => navigate("/login")}
                sx={{ fontWeight: 700, color: "#0f172a" }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate("/signup")}
                sx={{
                  borderRadius: 2.5,
                  px: 3,
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg, #0f172a 0%, #1db5c7 100%)",
                }}
              >
                Join Free
              </Button>
            </Stack>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
