import {
  Box,
  Button,
  Typography,
  Paper,
  MenuItem,
  TextField,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useApiClient from "../../hooks/useApiClient";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneIcon from "@mui/icons-material/Done";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function TaskList({ task, fetchTask, status, members }) {
  const [taskUpdates, setTaskUpdates] = useState({});
  const apiClient = useApiClient();
  const { workspaceId } = useParams();

  // UPDATED: Larger, clearer input styles
  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      height: "52px", // Increased from 44px
      borderRadius: "12px",
      fontSize: "1rem", // Standard readable size
      bgcolor: "#fff",
      "& fieldset": { borderColor: "#e2e8f0" },
      "&:hover fieldset": { borderColor: "#cbd5e1" },
      "&.Mui-focused fieldset": { borderColor: "#0e7490" },
    },
    "& .MuiInputLabel-root": {
      fontSize: "0.85rem", // Increased from 0.75rem
      fontWeight: 800,
      color: "#64748b",
      textTransform: "uppercase",
      letterSpacing: "0.025em",
    },
  };

  const handleChange = (id, field, value) => {
    setTaskUpdates((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleUpdateTask = async (id) => {
    const payload = taskUpdates[id];
    if (!payload) return;
    const res = await apiClient(`/workspaces/${workspaceId}/tasks/${id}`, {
      method: "PATCH",
      body: payload,
    });
    if (res.success) {
      fetchTask("");
      setTaskUpdates((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", // Slightly wider cards
        gap: 4,
        mt: 4,
      }}
    >
      {task.map((val) => {
        const hasChanges = !!taskUpdates[val._id];

        return (
          <Paper
            key={val._id}
            elevation={0}
            sx={{
              borderRadius: "24px",
              border: "1px solid #e2e8f0",
              height: "580px", // Increased height to accommodate larger fonts
              display: "flex",
              flexDirection: "column",
              bgcolor: "#fff",
              overflow: "hidden",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
            }}
          >
            {/* 1. HEADER SECTION */}
            <Box sx={{ p: 4, pb: 2 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 900,
                    color: "#0ea5e9",
                    letterSpacing: 1.5,
                    fontSize: "0.8rem",
                  }}
                >
                  {val.category?.toUpperCase() || "GENERAL TASK"}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ color: "#94a3b8" }}
                >
                  <CalendarTodayIcon sx={{ fontSize: 16 }} />
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    sx={{ fontSize: "0.85rem" }}
                  >
                    {val.dueDate
                      ? new Date(val.dueDate).toLocaleDateString()
                      : "No Deadline"}
                  </Typography>
                </Stack>
              </Stack>

              {/* TITLE: Large and Bold */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: "#1e293b",
                  mb: 2,
                  fontSize: "1.25rem",
                }}
              >
                {val.title}
              </Typography>

              {/* DESCRIPTION: Standard Body Size */}
              <Box sx={{ height: "120px", overflowY: "auto", pr: 1 }}>
                <Typography
                  variant="body1"
                  sx={{ color: "#475569", lineHeight: 1.7, fontSize: "1rem" }}
                >
                  {val.description || "No description provided for this task."}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mx: 4, borderColor: "#f1f5f9" }} />

            {/* 2. PROPERTIES SECTION */}
            <Box sx={{ p: 4, flexGrow: 1, bgcolor: "#fcfdfe" }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 900,
                  color: "#94a3b8",
                  display: "block",
                  mb: 3,
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                }}
              >
                UPDATE TASK DETAILS
              </Typography>

              <Stack spacing={3}>
                <TextField
                  select
                  fullWidth
                  label="Status"
                  value={taskUpdates[val._id]?.status ?? val.status}
                  onChange={(e) =>
                    handleChange(val._id, "status", e.target.value)
                  }
                  sx={inputStyle}
                  InputLabelProps={{ shrink: true }}
                >
                  {status.map((s) => (
                    <MenuItem key={s} value={s} sx={{ fontSize: "1rem" }}>
                      {s}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  fullWidth
                  label="Assignee"
                  value={
                    taskUpdates[val._id]?.assignedTo ??
                    val.assignedTo?._id ??
                    ""
                  }
                  onChange={(e) =>
                    handleChange(val._id, "assignedTo", e.target.value)
                  }
                  sx={inputStyle}
                  InputLabelProps={{ shrink: true }}
                >
                  <MenuItem value="" sx={{ fontSize: "1rem" }}>
                    Unassigned
                  </MenuItem>
                  {members.map((m) => (
                    <MenuItem key={m.id} value={m.id} sx={{ fontSize: "1rem" }}>
                      {m.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </Box>

            {/* 3. FOOTER ACTIONS */}
            <Box
              sx={{
                p: 3,
                px: 4,
                bgcolor: "#fff",
                borderTop: "1px solid #f1f5f9",
              }}
            >
              <Stack direction="row" spacing={2}>
                <Button
                  fullWidth
                  variant="contained"
                  disableElevation
                  disabled={!hasChanges}
                  onClick={() => handleUpdateTask(val._id)}
                  startIcon={<DoneIcon />}
                  sx={{
                    height: "52px",
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 700,
                    borderRadius: "14px",
                    background: hasChanges
                      ? "linear-gradient(90deg, #0e7490, #22d3ee)"
                      : "#f1f5f9",
                    color: hasChanges ? "#fff" : "#94a3b8",
                  }}
                >
                  {hasChanges ? "Save Changes" : "Up to date"}
                </Button>
                <IconButton
                  sx={{
                    width: "52px",
                    height: "52px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "14px",
                    color: "#94a3b8",
                  }}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Stack>
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
}
