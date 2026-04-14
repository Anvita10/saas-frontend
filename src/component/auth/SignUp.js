import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
  InputAdornment,
  Box,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import useApiClient from "../../hooks/useApiClient";
import AuthLayout from "./AuthLayout";
import { useToast } from "../../context/ToastContext";

function SignUp() {
  const { showToast } = useToast();
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
  });

  const [isLoading, setIsLoading] = useState(false);

  const apiClient = useApiClient();
  const navigate = useNavigate();

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
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
      const res = await apiClient("/signup", { method: "POST", body: form });

      showToast(res.message, "success");
      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout maxWidth={480}>
      <Stack spacing={3}>
        <Stack spacing={0.5} alignItems="center">
          <Typography
            variant="overline"
            sx={{ color: "#1db5c7", fontWeight: 800 }}
          >
            TASKLY FLOW
          </Typography>

          <Typography variant="h4" sx={{ fontWeight: 900 }}>
            Create your account
          </Typography>

          <Typography color="text.secondary">
            Start managing workspace like a pro
          </Typography>
        </Stack>

        {error.creds && <Alert severity="error">{error.creds}</Alert>}

        {[
          { label: "Full Name", name: "name", icon: <PersonOutlineIcon /> },
          { label: "Email", name: "email", icon: <MailOutlineIcon /> },
          { label: "Phone", name: "phoneNo", icon: <PhoneAndroidIcon /> },
          {
            label: "Password",
            name: "password",
            icon: <LockOutlinedIcon />,
            type: "password",
          },
        ].map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type || "text"}
            value={form[field.name]}
            onChange={handleFormChange}
            error={Boolean(error[field.name])}
            helperText={error[field.name]}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">{field.icon}</InputAdornment>
              ),
            }}
          />
        ))}

        <Button
          fullWidth
          variant="contained"
          disabled={isLoading}
          onClick={handleClick}
        >
          {isLoading ? "Preparing..." : "Get Started"}
        </Button>

        <Typography textAlign="center" color="text.secondary">
          Already a member?{" "}
          <Box
            component="span"
            onClick={() => navigate("/login")}
            sx={{ color: "#1db5c7", fontWeight: 800, cursor: "pointer" }}
          >
            Sign In
          </Box>
        </Typography>
      </Stack>
    </AuthLayout>
  );
}

export default SignUp;
