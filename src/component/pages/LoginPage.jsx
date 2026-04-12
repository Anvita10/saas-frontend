import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Stack,
  InputAdornment,
  IconButton,
  Fade,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AuthContext } from "../../context/AuthContext";
import useApiClient from "../../hooks/useApiClient";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "", creds: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const apiClient = useApiClient();
  const navigate = useNavigate();
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "", creds: "" });
  }

  const handleClick = async () => {
    if (!form.email || !emailRegex.test(form.email)) {
      setError({ ...error, email: "Please enter a valid email" });
      return;
    }
    if (!form.password) {
      setError({ ...error, password: "Password is required" });
      return;
    }

    try {
      setIsLoading(true);
      const res = await apiClient("/login", {
        method: "POST",
        body: { email: form.email, password: form.password },
      });

      if (!res?.data.token) {
        setError((prev) => ({ ...prev, creds: "Login failed" }));
        return;
      }
      login(res.data.token, res.data.username);
      navigate("/dashboard");
    } catch (err) {
      setError((prev) => ({
        ...prev,
        creds: err.message || "Invalid credentials",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #1db5c7 100%)",
        p: 2,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Brand-Consistent Glows */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: 350,
          height: 350,
          bgcolor: "rgba(255,255,255,0.04)",
          filter: "blur(90px)",
          borderRadius: "50%",
        }}
      />

      <Fade in={true} timeout={800}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            width: "100%",
            maxWidth: 450,
            borderRadius: 8,
            bgcolor: "rgba(255, 255, 255, 0.96)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.45)",
            zIndex: 1,
          }}
        >
          {/* Header Typography Section */}
          <Stack spacing={0.5} alignItems="center" mb={5}>
            <Typography
              variant="overline"
              sx={{
                color: "#1db5c7",
                fontWeight: 800,
                letterSpacing: "0.2em",
                lineHeight: 1,
                mb: 1,
              }}
            >
              TASKLY FLOW
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                color: "#0f172a",
                letterSpacing: "-0.04em",
                textAlign: "center",
              }}
            >
              Welcome back
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", fontWeight: 400, mt: 0.5 }}
            >
              Log in to continue your progress
            </Typography>
          </Stack>

          {error.creds && (
            <Alert
              severity="error"
              variant="filled"
              sx={{ mb: 3, borderRadius: 3, fontWeight: 600 }}
            >
              {error.creds}
            </Alert>
          )}

          <Stack spacing={2.5}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              value={form.email}
              onChange={handleFormChange}
              error={Boolean(error.email)}
              helperText={error.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon
                      sx={{ color: "text.secondary", fontSize: 20 }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  bgcolor: "#fcfdfe",
                  "&:hover": { bgcolor: "#f1f5f9" },
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleFormChange}
              error={Boolean(error.password)}
              helperText={error.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon
                      sx={{ color: "text.secondary", fontSize: 20 }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? (
                        <VisibilityOff fontSize="small" />
                      ) : (
                        <Visibility fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  bgcolor: "#fcfdfe",
                  "&:hover": { bgcolor: "#f1f5f9" },
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              onClick={handleClick}
              sx={{
                mt: 1,
                py: 2,
                borderRadius: 3,
                fontWeight: 800,
                textTransform: "none",
                fontSize: "1.05rem",
                letterSpacing: "0.02em",
                background: "linear-gradient(135deg, #0f172a 0%, #1db5c7 100%)",
                boxShadow: "0 12px 20px -5px rgba(29, 181, 199, 0.4)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  filter: "brightness(1.1)",
                },
              }}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            <Typography
              variant="body2"
              textAlign="center"
              sx={{ color: "text.secondary", fontWeight: 500 }}
            >
              New here?{" "}
              <Box
                component="span"
                onClick={() => navigate("/signup")}
                sx={{
                  color: "#1db5c7",
                  fontWeight: 800,
                  cursor: "pointer",
                  ml: 0.5,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Create a free account
              </Box>
            </Typography>
          </Stack>
        </Paper>
      </Fade>
    </Box>
  );
}

export default LoginPage;
