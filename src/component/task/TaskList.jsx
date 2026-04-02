import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
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
      case "Completed": return { color: "success" };
      case "Pending": return { color: "warning" };
      case "Rejected": return { color: "error" };
      case "In-progress": return { color: "info" };
      default: return { color: "default" };
    }
  };

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Grid 
        container 
        spacing={3} 
        sx={{ 
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)"
          },
          gap: 3, 
          width: "100%",
          margin: 0
        }}
      >
        {task.map((val) => (
          <Box key={val._id} sx={{ minWidth: 0, display: "flex" }}> 
            <Paper
              elevation={0}
              sx={{
                width: "100%", 
                display: "flex",
                flexDirection: "column",
                borderRadius: 4,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
                },
              }}
            >
              <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 800, color: "text.secondary", textTransform: 'uppercase' }}
                  >
                    {val.category || "General"}
                  </Typography>
                  <Chip
                    label={val.status}
                    size="small"
                    color={getStatusColor(val.status).color}
                    sx={{ fontWeight: 700, borderRadius: 1.5, height: 22, fontSize: "0.65rem" }}
                  />
                </Stack>

                <Box sx={{ height: '55px', overflow: 'hidden', mb: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#1e293b",
                      lineHeight: 1.2,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {val.title}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ borderStyle: "dashed", opacity: 0.6 }} />

              <Box sx={{ p: 2.5, bgcolor: "#fcfcfc" }}>
                <Stack spacing={2}>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    label="Update Status"
                    value={val.status}
                    onChange={(e) => handleSelect(e, val._id)}
                    sx={{ 
                        bgcolor: "white",
                        "& .MuiOutlinedInput-root": { borderRadius: 2 } 
                    }}
                  >
                    {options.map((opt) => (
                      <MenuItem key={opt} value={opt} sx={{ fontSize: '0.85rem' }}>
                        {opt}
                      </MenuItem>
                    ))}
                  </TextField>

                  <Button
                    fullWidth
                    variant="text"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(val._id)}
                    sx={{ 
                        fontWeight: 700, 
                        textTransform: "none",
                        py: 0.5
                    }}
                  >
                    Remove Task
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}