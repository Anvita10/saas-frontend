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
  Chip,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useApiClient from "../../hooks/useApiClient";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneIcon from "@mui/icons-material/Done";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useToast } from "../../context/ToastContext";
import { STATUS_LIST } from "../../constants/Constants";
import {
  CARD_STYLES,
  CARD_HOVER,
  getStatusConfig,
  getPriorityColor,
} from "../../theme/commonStyle";

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    height: "52px",
    borderRadius: "12px",
    fontSize: "1rem",
    bgcolor: "#fff",
    "& fieldset": { borderColor: "#e2e8f0" },
    "&:hover fieldset": { borderColor: "#cbd5e1" },
    "&.Mui-focused fieldset": { borderColor: "#0e7490" },
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.85rem",
    fontWeight: 800,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.025em",
  },
};

export default function TaskList({ task, fetchTask, members }) {
  const [taskUpdates, setTaskUpdates] = useState({});
  const apiClient = useApiClient();
  const { workspaceId } = useParams();
  const { showToast } = useToast();

  const handleChange = (id, field, value) => {
    setTaskUpdates((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleUpdateTask = async (id) => {
    try {
      const payload = taskUpdates[id];
      if (!payload) return;
      const res = await apiClient(`/workspaces/${workspaceId}/tasks/${id}`, {
        method: "PATCH",
        body: payload,
      });
      if (res.success) {
        showToast(res.message, "success");
        fetchTask("");
        setTaskUpdates((prev) => {
          const copy = { ...prev };
          delete copy[id];
          return copy;
        });
      }
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await apiClient(`/workspaces/${workspaceId}/tasks/${id}`, {
        method: "DELETE",
      });
      if (res.success) {
        showToast("Deleted successfully", "success");
        fetchTask("");
      }
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
        gap: 3,
        mt: 3,
      }}
    >
      {task.map((val) => {
        const hasChanges =
          taskUpdates[val._id] && Object.keys(taskUpdates[val._id]).length > 0;

        const status = getStatusConfig(val.status);
        const priorityColor = getPriorityColor(val.priority);

        return (
          <Paper
            key={val._id}
            elevation={0}
            sx={{
              ...CARD_STYLES,
              ...CARD_HOVER,
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* STATUS STRIP */}
            <Box
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 5,
                height: "100%",
                bgcolor: status.color,
              }}
            />

            {/* HEADER */}
            <Box sx={{ p: 3, pl: 4, pb: 1.5 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      color: "#1e293b",
                      fontSize: "1.25rem",
                    }}
                  >
                    {val.title}
                  </Typography>

                  <CalendarTodayIcon sx={{ fontSize: 16, color: "#94a3b8" }} />

                  <Typography
                    variant="body2"
                    fontWeight={700}
                    sx={{ fontSize: "0.85rem", color: "#64748b" }}
                  >
                    {val.dueDate
                      ? new Date(val.dueDate).toLocaleDateString()
                      : "No Deadline"}
                  </Typography>
                </Stack>

                {/* PRIORITY */}
                <Chip
                  label={(val.priority || "low").toUpperCase()}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    bgcolor: `${priorityColor}15`,
                    color: priorityColor,
                  }}
                />
              </Stack>

              <Box sx={{ px: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#475569",
                    lineHeight: 1.6,
                  }}
                >
                  {val.description || "No description provided for this task."}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mx: 4, borderColor: "#f1f5f9" }} />

            {/* UPDATE SECTION */}
            <Box sx={{ p: 3, flexGrow: 1, bgcolor: status.bg }}>
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
                  {STATUS_LIST.map((s) => (
                    <MenuItem key={s} value={s}>
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
                  <MenuItem value="">Unassigned</MenuItem>
                  {members.map((m) => (
                    <MenuItem key={m.id} value={m.id}>
                      {m.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </Box>

            {/* FOOTER */}
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
                  onClick={() => deleteTask(val._id)}
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
