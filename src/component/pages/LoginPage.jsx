import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import data from "../../data/validUser.json";
import { Alert } from "@mui/material";
import generateToken from "../../utils/generateToken";
import { AuthContext } from "../../context/AuthContext";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "", creds: "" });
  const { login } = useContext(AuthContext);
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const navigate = useNavigate();

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "", creds: "" });
  }

  function handleClick() {
    if (!form.email) {
      setError({ ...error, email: "Email is required" });
      return;
    } else if (!form.password) {
      setError({ ...error, password: "Password is required" });
      return;
    } else if (!emailRegex.test(form.email)) {
      setError({ ...error, email: "Email is Invalid" });
      return;
    } else if (form.email !== data.email || form.password !== data.password) {
      setError({ ...error, creds: "Invalid Credentials" });
      return;
    } else {
      const token = generateToken(data.id);
      login(token);
      navigate("/Home");
    }
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
          width: 340,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight="600" mb={3} textAlign="center">
          Login
        </Typography>
        {error.creds && <Alert severity="error">{error.creds}</Alert>}

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
          Login
        </Button>
      </Paper>
    </Box>
  );
}

export default LoginPage;
