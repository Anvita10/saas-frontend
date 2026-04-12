import { useState } from "react";
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
  Snackbar,
  Slide,
  IconButton,
  Fade,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import useApiClient from "../../hooks/useApiClient";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

function SignUp() {
  const [form, setForm] = useState({
    name: "",
    phoneNo: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    name: "",
    phoneNo: "",
    email: "",
    password: "",
    creds: "",
  });
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const apiClient = useApiClient();
  const navigate = useNavigate();
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "", creds: "" });
  }

  const handleClick = async () => {
    if (!form.name) {
      setError({ ...error, name: "Name is required" });
      return;
    }
    if (!form.email || !emailRegex.test(form.email)) {
      setError({ ...error, email: "Valid email is required" });
      return;
    }
    if (!form.password || form.password.length < 6) {
      setError({ ...error, password: "Min 6 characters required" });
      return;
    }

    try {
      setIsLoading(true);
      await apiClient("/signup", { method: "POST", body: form });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      setError((prev) => ({
        ...prev,
        creds: err.message || "Signup failed. Please try again.",
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
        fontFamily: "'Inter', sans-serif", // Hinting at modern sans-serif
      }}
    >
      <Fade in={true} timeout={800}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            width: "100%",
            maxWidth: 480,
            borderRadius: 8, // More rounded for B2C feel
            bgcolor: "rgba(255, 255, 255, 0.96)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.45)",
          }}
        >
          {/* Typography Header Section */}
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
                letterSpacing: "-0.04em", // Tight kerning for premium feel
                textAlign: "center",
              }}
            >
              Create your account
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontWeight: 400,
                fontSize: "0.95rem",
              }}
            >
              Start managing workspace like a pro.
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
            {/* Input Fields with refined Label Typography */}
            {[
              {
                label: "Full Name",
                name: "name",
                icon: <PersonOutlineIcon />,
                type: "text",
              },
              {
                label: "Email Address",
                name: "email",
                icon: <MailOutlineIcon />,
                type: "text",
              },
              {
                label: "Phone Number",
                name: "phoneNo",
                icon: <PhoneAndroidIcon />,
                type: "text",
              },
              {
                label: "Password",
                name: "password",
                icon: <LockOutlinedIcon />,
                type: "password",
              },
            ].map((field) => (
              <TextField
                key={field.name}
                fullWidth
                label={field.label}
                name={field.name}
                type={field.type}
                value={form[field.name]}
                onChange={handleFormChange}
                error={Boolean(error[field.name])}
                helperText={error[field.name]}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {field.icon}
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputLabel-root": {
                    fontWeight: 500,
                    color: "text.secondary",
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "#fcfdfe",
                    transition: "0.3s",
                    "&:hover": { bgcolor: "#f1f5f9" },
                    "& fieldset": { borderColor: "#e2e8f0" },
                  },
                }}
              />
            ))}

            <Button
              fullWidth
              variant="contained"
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
              {isLoading ? "Preparing Workspace..." : "Get Started Now"}
            </Button>

            <Typography
              variant="body2"
              textAlign="center"
              sx={{ color: "text.secondary", fontWeight: 500 }}
            >
              Already a member?{" "}
              <Box
                component="span"
                onClick={() => navigate("/login")}
                sx={{
                  color: "#1db5c7",
                  fontWeight: 800,
                  cursor: "pointer",
                  ml: 0.5,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Sign In
              </Box>
            </Typography>
          </Stack>
        </Paper>
      </Fade>

      {/* Snackbar is kept standard as it follows the brand logic already */}
      <Snackbar
        open={success}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{
            borderRadius: 3,
            bgcolor: "#0f172a",
            color: "#1db5c7",
            fontWeight: 700,
          }}
        >
          Welcome aboard! Redirecting...
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default SignUp;
