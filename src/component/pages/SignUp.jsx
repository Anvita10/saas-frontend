import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { Alert } from "@mui/material";
import useApiClient from "../../hooks/useApiClient";

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
        await apiClient("/signup", {
          method: "POST",
          body: {
            name: form.name,
            email: form.email,
            phoneNo: form.phoneNo,
            password: form.password,
          },
        });
        navigate("/home");
      } catch (err) {
        setError((prev) => ({ ...prev, creds: "Signup failed" }));
      }
    }
  };

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
          width: 340,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight="600" mb={3} textAlign="center">
          Sign Up
        </Typography>
        {error.creds && <Alert severity="error">{error.creds}</Alert>}

        <TextField
          fullWidth
          type="text"
          label="Name"
          margin="normal"
          name="name"
          value={form.name}
          onChange={(e) => handleFormChange(e)}
          error={Boolean(error.name)}
          helperText={error.name}
        />

        <TextField
          fullWidth
          type="email"
          label="Email"
          margin="normal"
          name="email"
          value={form.email}
          onChange={(e) => handleFormChange(e)}
          error={Boolean(error.email)}
          helperText={error.email}
        />

        <TextField
          fullWidth
          type="tel"
          label="Phone No"
          margin="normal"
          name="phoneNo"
          value={form.phoneNo}
          onChange={(e) => handleFormChange(e)}
          error={Boolean(error.phoneNo)}
          helperText={error.phoneNo}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          margin="normal"
          name="password"
          value={form.password}
          onChange={(e) => handleFormChange(e)}
          error={Boolean(error.password)}
          helperText={error.password}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            textTransform: "none",
            borderRadius: 2,
            padding: "10px",
          }}
          onClick={handleClick}
        >
          Sign Up
        </Button>
      </Paper>
    </Box>
  );
}

export default SignUp;
