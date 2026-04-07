import {
  Box,
  Button,
  Typography,
  Paper,
  MenuItem,
  Chip,
  TextField,
  Stack,
  Divider,
} from "@mui/material";
import useApiClient from "../../hooks/useApiClient";

export default function TaskList({ task, fetchTask }) {
  const apiClient = useApiClient();

  const options = ["Completed", "Pending", "ToDo", "Rejected", "In-progress"];

  const handleSelect = async (e, id) => {
    try {
      const updatedStatus = e.target.value;
      const response = await apiClient(`/tasks/${id}`, {
        method: "PUT",
        body: { status: updatedStatus },
      });
      if (response.success) fetchTask();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient(`/tasks/${id}`, { method: "DELETE" });
      fetchTask();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "success";
      case "Pending": return "warning";
      case "Rejected": return "error";
      case "In-progress": return "info";
      default: return "default";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "error";
      case "Medium": return "warning";
      case "Low": return "success";
      default: return "default";
    }
  };

  if (!task.length) {
    return (
      <Typography sx={{ mt: 3, textAlign: "center" }}>
        No tasks yet
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        gap: 3,
        mt: 2,
      }}
    >
      {task.map((val) => (
        <Paper
          key={val._id}
          elevation={0}
          sx={{
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
            overflow: "hidden",
            transition: "0.2s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
            },
          }}
        >
          {/* TOP */}
          <Box sx={{ p: 2.5 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography variant="caption" fontWeight={700}>
                {val.category || "General"}
              </Typography>

              <Chip
                label={val.status}
                size="small"
                color={getStatusColor(val.status)}
              />
            </Stack>

            {/* TITLE */}
            <Typography variant="h6" fontWeight={700}>
              {val.title}
            </Typography>

            {/* DESCRIPTION */}
            {val.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                mt={0.5}
              >
                {val.description}
              </Typography>
            )}

            {/* META */}
            <Stack spacing={1} mt={2}>
              {val.assignedTo && (
                <Typography variant="caption">
                  Assigned To: <b>{val.assignedTo}</b>
                </Typography>
              )}

              {val.assignedBy && (
                <Typography variant="caption">
                  Assigned By: <b>{val.assignedBy}</b>
                </Typography>
              )}

              {val.dueDate && (
                <Typography variant="caption">
                  Due:{" "}
                  <b>
                    {new Date(val.dueDate).toLocaleDateString()}
                  </b>
                </Typography>
              )}

              <Stack direction="row" spacing={1}>
                {val.priority && (
                  <Chip
                    label={val.priority}
                    size="small"
                    color={getPriorityColor(val.priority)}
                  />
                )}
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* ACTIONS */}
          <Box sx={{ p: 2 }}>
            <Stack spacing={2}>
              <TextField
                select
                fullWidth
                size="small"
                label="Update Status"
                value={val.status}
                onChange={(e) => handleSelect(e, val._id)}
              >
                {options.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>

              <Button
                fullWidth
                color="error"
                onClick={() => handleDelete(val._id)}
              >
                Remove Task
              </Button>
            </Stack>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
