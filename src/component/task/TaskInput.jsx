import React, { useState } from "react";
import {
  TextField,
  Box,
  Button,
  Stack,
  MenuItem,
  Paper,
  Typography,
  InputAdornment,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CategoryIcon from "@mui/icons-material/Category";

export default function TaskInput({ categoryList, onAddTask }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "Medium",
    category: "",
    dueDate: null,
  });

  const [error, setError] = useState({ title: "", description: "" });

  const priorityList = ["Low", "Medium", "High"];

  const handleClick = async () => {
    const newErrors = { title: "", description: "" };

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.description.trim()) newErrors.description = "Description is required";

    if (newErrors.title || newErrors.description) {
      setError(newErrors);
      return;
    }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
    };

    if (form.assignedTo) payload.assignedTo = form.assignedTo;
    if (form.category) payload.category = form.category;
    if (form.dueDate) payload.dueDate = form.dueDate.toISOString();

    try {
      await onAddTask(payload);

      setForm({
        title: "",
        description: "",
        assignedTo: "",
        priority: "Medium",
        category: "",
        dueDate: null,
      });

      setError({ title: "", description: "" });
    } catch (err) {
      alert("Something went wrong");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (name in error) {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
        backgroundColor: "#ffffff",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack spacing={3}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          Create New Task
        </Typography>

        {/* Title */}
        <TextField
          fullWidth
          label="Title"
          placeholder="What needs to be done?"
          value={form.title}
          name="title"
          onChange={handleFormChange}
          error={Boolean(error.title)}
          helperText={error.title}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "#f8fafc",
            },
          }}
        />

        {/* Description */}
        <TextField
          fullWidth
          multiline
          minRows={3}
          label="Description"
          placeholder="Add more details..."
          value={form.description}
          name="description"
          onChange={handleFormChange}
          error={Boolean(error.description)}
          helperText={error.description}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "#f8fafc",
            },
          }}
        />

        {/* Row 1 */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            select
            fullWidth
            label="Assigned To"
            name="assignedTo"
            value={form.assignedTo}
            onChange={handleFormChange}
          >
            {categoryList.map((val, idx) => (
              <MenuItem key={idx} value={val}>
                {val}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            fullWidth
            label="Priority"
            name="priority"
            value={form.priority}
            onChange={handleFormChange}
          >
            {priorityList.map((val, idx) => (
              <MenuItem key={idx} value={val}>
                {val}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        {/* Row 2 */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            select
            fullWidth
            label="Category"
            name="category"
            value={form.category}
            onChange={handleFormChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CategoryIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="">Select Category</MenuItem>
            {categoryList.map((val, idx) => (
              <MenuItem key={idx} value={val}>
                {val}
              </MenuItem>
            ))}
          </TextField>

          <DatePicker
            label="Due Date"
            value={form.dueDate}
            onChange={(val) =>
              setForm((prev) => ({ ...prev, dueDate: val }))
            }
            disablePast
          />
        </Stack>

        {/* Button */}
        <Box>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleClick}
            disabled={!form.title.trim() || !form.description.trim()}
            startIcon={<AddCircleOutlineIcon />}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              height: 44,
              boxShadow: "none",
              background: "linear-gradient(45deg, #2563eb 30%, #3b82f6 90%)",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
              },
            }}
          >
            Add Task
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
