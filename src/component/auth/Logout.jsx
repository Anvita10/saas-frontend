import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography, Button, Stack, Avatar } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import { useToast } from "../../context/ToastContext";
import { CARD_HOVER, CARD_STYLES } from "../../theme/commonStyle";

function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { showToast } = useToast();

  function handleYes() {
    logout();
    showToast("Logged out successfully", "success");
    navigate("/login");
  }

  // CANCEL LOGIC
  function handleNo() {
    navigate(-1);
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ background: "#f8fafc" }}
    >
      <Paper
        elevation={0}
        sx={{
          ...CARD_STYLES,
          ...CARD_HOVER,
          padding: 5,
          width: 400,
          textAlign: "center",
        }}
      >
        <Avatar
          sx={{
            bgcolor: "#f0fdfa", // Subtle teal tint
            width: 70,
            height: 70,
            margin: "0 auto 24px",
            border: "1px solid #ccfbf1",
          }}
        >
          <LogoutIcon sx={{ color: "#0891b2", fontSize: 35 }} />
        </Avatar>

        <Typography
          sx={{ fontSize: "1.6rem", fontWeight: 900, color: "#0f172a", mb: 1 }}
        >
          Confirm Logout
        </Typography>

        <Typography
          sx={{ fontSize: "1.1rem", color: "#64748b", mb: 5, fontWeight: 500 }}
        >
          Are you sure you want to log out? You'll need your credentials to get
          back in.
        </Typography>

        <Stack spacing={2}>
          {/* YES BUTTON - MATCHED TO YOUR TEAL THEME */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleYes}
            sx={{
              textTransform: "none",
              borderRadius: "12px",
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 800,
              // MATCHES TASKFLOW GRADIENT
              background: "linear-gradient(90deg, #134e4a, #0891b2) !important",
              color: "#fff",
              boxShadow: "0 4px 12px rgba(8, 145, 178, 0.2)",
              "&:hover": {
                background:
                  "linear-gradient(90deg, #0f3d3a, #067a96) !important",
              },
              "&:active": {
                transform: "scale(0.98)",
              },
            }}
          >
            Yes, Logout
          </Button>

          {/* NO BUTTON */}
          <Button
            fullWidth
            variant="outlined"
            onClick={handleNo}
            sx={{
              textTransform: "none",
              borderRadius: "12px",
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#64748b",
              borderColor: "#e2e8f0",
              "&:hover": {
                borderColor: "#cbd5e1",
                bgcolor: "#f8fafc",
              },
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default Logout;
