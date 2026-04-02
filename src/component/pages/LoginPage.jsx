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
  
  const { login } = useContext(AuthContext);
  const apiClient = useApiClient();
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const navigate = useNavigate();

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "", creds: "" });
  }

  const handleClick = async () => {
    if (!form.email) {
      setError({ ...error, email: "Email is required" });
      return;
    } else if (!form.password) {
      setError({ ...error, password: "Password is required" });
      return;
    } else if (!emailRegex.test(form.email)) {
      setError({ ...error, email: "Email is Invalid" });
      return;
    } else {
      try {
        const res = await apiClient("/login", {
          method: "POST",
          body: { email: form.email, password: form.password },
        });

        if (!res?.token) {
          setError((prev) => ({ ...prev, email: "Login failed" }));
          return;
        }
        login(res.token);
        navigate("/");
      } catch (err) {
        setError((prev) => ({ ...prev, creds: err.message || "Login failed" }));
      }
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundColor: "#f8fafc",
        backgroundImage: `radial-gradient(at 0% 0%, hsla(215,100%,98%,1) 0, transparent 50%), 
                          radial-gradient(at 100% 0%, hsla(220,100%,97%,1) 0, transparent 50%)`,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 5,
          width: 400,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
        }}
      >
        <Stack spacing={1} alignItems="center" mb={4}>
          <Typography
            variant="h4"
            fontWeight="700"
            sx={{ color: "text.primary", letterSpacing: "-0.5px" }}
          >
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please enter your details to sign in
          </Typography>
        </Stack>

        {error.creds && (
          <Alert
            severity="error"
            variant="outlined"
            sx={{ mb: 3, borderRadius: 2, fontWeight: 500 }}
          >
            {error.creds}
          </Alert>
        )}

        <Stack spacing={2.5}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            placeholder="name@company.com"
            value={form.email}
            onChange={handleFormChange}
            error={Boolean(error.email)}
            helperText={error.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }}
          />

          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            label="Password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleFormChange}
            error={Boolean(error.password)}
            helperText={error.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleClick}
            sx={{
              mt: 1,
              py: 1.5,
              textTransform: "none",
              borderRadius: 2.5,
              fontWeight: 700,
              fontSize: "1rem",
              boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
              background: "linear-gradient(45deg, #2563eb 30%, #3b82f6 90%)",
              "&:hover": {
                background: "linear-gradient(45deg, #1d4ed8 30%, #2563eb 90%)",
                boxShadow: "0 6px 16px rgba(37, 99, 235, 0.3)",
              },
            }}
          >
            Sign In
          </Button>

          <Typography variant="body2" color="text.secondary" textAlign="center" pt={1}>
            Don't have an account?{" "}
            <Box
              component="span"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => navigate("/signup")}
            >
              Create one
            </Box>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

export default LoginPage;
