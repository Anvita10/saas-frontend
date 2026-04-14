import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Stack,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../../context/AuthContext";
import useApiClient from "../../hooks/useApiClient";
import AuthLayout from "./AuthLayout";
import { useToast } from "../../context/ToastContext";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const { login } = useAuth();
  const apiClient = useApiClient();
  const navigate = useNavigate();

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
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
        body: form,
      });

      if (!res?.data.token) {
        showToast(res.message || "loing Failed", "error");
        return;
      }

      login(res.data.token, res.data.username);
      showToast(res.message || "Login successful 🎉", "success");
      navigate("/dashboard");
    } catch (err) {
      showToast(err.message || "Invalid credentials", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Stack spacing={3}>
        <Stack spacing={0.5} alignItems="center">
          <Typography
            variant="overline"
            sx={{ color: "#1db5c7", fontWeight: 800 }}
          >
            TASKLY FLOW
          </Typography>

          <Typography variant="h4" sx={{ fontWeight: 900 }}>
            Welcome back
          </Typography>

          <Typography color="text.secondary">
            Log in to continue your progress
          </Typography>
        </Stack>

        <TextField
          label="Email Address"
          name="email"
          value={form.email}
          onChange={handleFormChange}
          error={Boolean(error.email)}
          helperText={error.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
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
                <LockOutlinedIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          variant="contained"
          disabled={isLoading}
          onClick={handleClick}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>

        <Typography textAlign="center" color="text.secondary">
          New here?{" "}
          <Box
            component="span"
            onClick={() => navigate("/signup")}
            sx={{
              color: "#1db5c7",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Create a free account
          </Box>
        </Typography>
      </Stack>
    </AuthLayout>
  );
}

export default LoginPage;
