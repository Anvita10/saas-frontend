import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Chip,
  TextField,
} from "@mui/material";
import useApiClient from "../../hooks/useApiClient";

export default function TaskList({ task, fetchTask }) {
  const apiClient = useApiClient();

  const options = ["Completed", "Pending", "ToDo", "Rejected", "In-progress"];

  const handleSelect = async (e, id) => {
    const updatedStatus = e.target.value;

    const response = await apiClient(`/tasks/${id}`, {
      method: "PUT",
      body: { status: updatedStatus },
    });

    if (response.success) fetchTask();
  };

  const handleDelete = async (id) => {
    await apiClient(`/tasks/${id}`, { method: "DELETE" });
    fetchTask();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "Pending":
        return "warning";
      case "Rejected":
        return "error";
      case "In-progress":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <Grid container spacing={3}>
      {task.map((val) => (
        <Grid item xs={12} sm={6} md={4} key={val._id}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRadius: 3,
              border: "1px solid #eee",
              p: 1,
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 12px 25px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent>
              {/* Category */}
              <Chip label={val.category} size="small" sx={{ mb: 1 }} />

              {/* Title */}
              <Typography variant="h6" fontWeight="600" sx={{ mb: 1 }}>
                {val.title}
              </Typography>

              {/* Status */}
              <Chip
                label={val.status}
                color={getStatusColor(val.status)}
                size="small"
              />
            </CardContent>

            {/* Bottom Actions */}
            <Box sx={{ p: 2 }}>
              <TextField
                select
                fullWidth
                size="small"
                value={val.status}
                onChange={(e) => handleSelect(e, val._id)}
                sx={{ mb: 1 }}
              >
                {options.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>

              <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={() => handleDelete(val._id)}
              >
                Delete
              </Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
