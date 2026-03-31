import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography, Button, Stack } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Logout() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  function handleYes() {
    logout();
    navigate("/");
  }

  function handleNo() {
    navigate("/home");
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ background: "#f5f6fa" }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          width: 360,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="600" mb={2}>
          Confirm Logout
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          Are you sure you want to log out?
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            color="error"
            onClick={handleYes}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              padding: "8px 20px",
            }}
          >
            Yes, Logout
          </Button>

          <Button
            variant="outlined"
            onClick={handleNo}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              padding: "8px 20px",
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
