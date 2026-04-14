import { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  MenuItem,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import GroupIcon from "@mui/icons-material/Group";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import useApiClient from "../../hooks/useApiClient";
import { useToast } from "../../context/ToastContext";

const CreateWorkspace = ({ onClose, getMyWorkspace }) => {
  const roles = ["ADMIN", "MEMBER"];
  const [wsName, setWsName] = useState("");
  const [email, setEmail] = useState("");
  const [userRole, setUserRole] = useState("MEMBER");
  const [error, setError] = useState("");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const apiClient = useApiClient();

  const isButtonDisabled = !wsName.trim() || members.length === 0 || loading;

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      bgcolor: "#f8fafc",
      fontSize: "0.95rem",
      "& fieldset": { borderColor: "#e2e8f0" },
      "&:hover fieldset": { borderColor: "#1db5c7" },
    },
    "& .MuiInputBase-input": { padding: "12px 14px" },
  };

  const handleWorkspaceSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await apiClient("/workspaces", {
        method: "POST",
        body: { name: wsName, members },
      });

      if (res.success) {
        showToast(res.message, "success");
        getMyWorkspace();
        setTimeout(() => {
          if (onClose) onClose();
        }, 1500);
      }
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (members.some((val) => val.email === email)) {
      setError("User already added");
      return;
    }
    setMembers((prev) => [...prev, { email, role: userRole.toLowerCase() }]);
    setEmail("");
    setError("");
  };

  const removeUser = (targetEmail) => {
    setMembers((prev) => prev.filter((val) => val.email !== targetEmail));
  };

  return (
    <Box sx={{ width: "100%", py: 1 }}>
      <form onSubmit={handleWorkspaceSubmit}>
        <Stack spacing={3}>
          {/* STEP 1: NAME */}
          <Box>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                color: "#1db5c7",
                letterSpacing: 1,
                ml: 0.5,
              }}
            >
              BASIC DETAILS
            </Typography>
            <TextField
              fullWidth
              placeholder="e.g. Design Team"
              value={wsName}
              onChange={(e) => {
                setError("");
                setWsName(e.target.value);
              }}
              sx={{ ...inputStyles, mt: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GroupIcon fontSize="small" sx={{ color: "#94a3b8" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* STEP 2: INVITATIONS */}
          <Box>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                color: "#1db5c7",
                letterSpacing: 1,
                ml: 0.5,
              }}
            >
              INVITE TEAM
            </Typography>
            <Stack direction="row" spacing={1} mt={1} alignItems="flex-start">
              <TextField
                fullWidth
                placeholder="colleague@company.com"
                value={email}
                onChange={(e) => {
                  setError("");
                  setEmail(e.target.value);
                }}
                sx={inputStyles}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineIcon
                        fontSize="small"
                        sx={{ color: "#94a3b8" }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                sx={{
                  minWidth: 100,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: "#f8fafc",
                  },
                  "& .MuiInputBase-input": {
                    padding: "12px 14px",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                  },
                }}
              >
                {roles.map((val) => (
                  <MenuItem
                    key={val}
                    value={val}
                    sx={{ fontSize: "0.85rem", fontWeight: 600 }}
                  >
                    {val}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                variant="contained"
                onClick={handleAddMember}
                disabled={!email}
                startIcon={<AddCircleOutlineIcon />}
                sx={{
                  minWidth: 110,
                  fontWeight: 700,
                }}
              >
                Add
              </Button>
            </Stack>
            {error && (
              <Typography
                variant="caption"
                color="error"
                sx={{ mt: 1, ml: 0.5, display: "block", fontWeight: 600 }}
              >
                {error}
              </Typography>
            )}
          </Box>

          {/* STEP 3: MEMBER LIST */}
          <Box
            sx={{
              maxHeight: 180,
              overflowY: "auto",
              bgcolor: "transparent",
              border: "none",
              borderRadius: 2,
              p: members.length > 0 ? 1 : 3,
            }}
          >
            {members.length > 0 ? (
              <List disablePadding>
                {members.map((member, idx) => (
                  <ListItem
                    key={idx}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => removeUser(member.email)}
                      >
                        <DeleteOutlineIcon fontSize="small" color="error" />
                      </IconButton>
                    }
                    sx={{
                      bgcolor: "white",
                      mb: 1,
                      borderRadius: 1.5,
                      border: "1px solid #e2e8f0",
                      "&:last-child": { mb: 0 },
                    }}
                  >
                    <ListItemAvatar sx={{ minWidth: 40 }}>
                      <Avatar
                        sx={{
                          width: 26,
                          height: 26,
                          fontSize: "0.75rem",
                          bgcolor: "#1db5c7",
                        }}
                      >
                        {member.email.charAt(0).toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={member.email}
                      primaryTypographyProps={{
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        noWrap: true,
                      }}
                      secondary={member.role}
                      secondaryTypographyProps={{
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        color: "#1db5c7",
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box textAlign="center">
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    color: "#0f172a",
                  }}
                >
                  No team members yet
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#64748b",
                    mt: 0.5,
                  }}
                >
                  Add teammates to collaborate in your workspace
                </Typography>
              </Box>
            )}
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isButtonDisabled}
            sx={{
              color: "#fff", // ✅ FORCE WHITE TEXT
              borderRadius: 2.5,
              textTransform: "none",
              fontWeight: 800,
              py: 2,
              fontSize: "1rem",
              boxShadow: "0 10px 20px rgba(29, 181, 199, 0.25)",
              "&:hover": {
                transform: "translateY(-1px)",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#94a3b8" }} />
            ) : (
              "Launch Workspace"
            )}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default CreateWorkspace;
