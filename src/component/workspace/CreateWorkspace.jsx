import { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  MenuItem,
  Paper,
  Typography,
  Box,
  Chip,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import GroupIcon from "@mui/icons-material/Group";
import useApiClient from "../../hooks/useApiClient";

const CreateWorkspace = () => {
  const role = ["ADMIN", "MEMBER"];
  const [wsName, setWsName] = useState("");
  const [email, setEmail] = useState("");
  const [userRole, setUserRole] = useState("MEMBER");
  const [error, setError] = useState("");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const apiClient = useApiClient();

  const handleWorkspaceSubmit = async (e) => {
    e.preventDefault();

    if (!wsName.trim()) {
      setError("Workspace name is required");
      return;
    }

    try {
      setLoading(true);

      const res = await apiClient("/workspaces", {
        method: "POST",
        body: { name: wsName, members },
      });

      if (res.success) {
        setSnackbar({
          open: true,
          message: "Workspace created successfully 🎉",
          severity: "success",
        });

        // reset
        setWsName("");
        setMembers([]);
        setEmail("");
        setUserRole("MEMBER");
        setError("");
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to create workspace",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = () => {
    if (!email.trim()) return;

    const isUserAlreadyAdded = members.some((val) => val.email === email);

    if (isUserAlreadyAdded) {
      setError("User already added");
      return;
    }

    setMembers((prev) => [...prev, { email, role: userRole.toLowerCase() }]);

    setUserRole("MEMBER");
    setEmail("");
    setError("");
  };

  const removeUser = (user) => {
    setMembers((prev) => prev.filter((val) => val.email !== user));
  };

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: 3,
          width: "100%",
          maxWidth: 500,
          mx: "auto",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <form onSubmit={handleWorkspaceSubmit}>
          <Stack spacing={3}>
            {/* HEADER */}
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Create Workspace
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Setup your team and start collaborating 🚀
              </Typography>
            </Box>

            {/* ERROR */}
            {error && (
              <Alert severity="error" sx={{ borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            {/* WORKSPACE NAME */}
            <TextField
              fullWidth
              label="Workspace Name"
              value={wsName}
              onChange={(e) => {
                setError("");
                setWsName(e.target.value);
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#f8fafc",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GroupIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            {/* ADD MEMBER */}
            <Box>
              <Typography fontWeight={600} mb={1}>
                Add Members
              </Typography>

              <Stack direction="row" spacing={1}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setError("");
                    setEmail(e.target.value);
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor: "#f8fafc",
                    },
                  }}
                />

                <TextField
                  select
                  size="small"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  sx={{
                    minWidth: 120,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                >
                  {role.map((val, idx) => (
                    <MenuItem key={idx} value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </TextField>

                <Button
                  variant="contained"
                  onClick={handleAddMember}
                  disabled={!email}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    minWidth: 100,
                    boxShadow: "none",
                  }}
                  startIcon={<AddCircleOutlineIcon />}
                >
                  Add
                </Button>
              </Stack>
            </Box>

            {/* MEMBERS LIST */}
            {members.length > 0 ? (
              <Stack spacing={1}>
                {members.map((val, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 1.5,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor: "#fafafa",
                    }}
                  >
                    <Box>
                      <Typography fontSize="0.9rem">{val.email}</Typography>
                      <Chip label={val.role} size="small" sx={{ mt: 0.5 }} />
                    </Box>

                    <IconButton
                      size="small"
                      onClick={() => removeUser(val.email)}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Stack>
            ) : (
              <Typography fontSize="0.85rem" color="text.secondary">
                No members added yet
              </Typography>
            )}

            {/* SUBMIT */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                py: 1,
                boxShadow: "none",
              }}
            >
              {loading ? "Creating..." : "Create Workspace"}
            </Button>
          </Stack>
        </form>
      </Paper>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateWorkspace;
