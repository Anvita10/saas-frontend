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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CategoryIcon from "@mui/icons-material/Category";

export default function TaskInput({ categoryList, onAddTask }) {
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleClick = async () => {
    if (!newTask.trim()) {
      setError("Please Enter the task");
      return;
    }

    if (!category) {
      setError("Please select the category");
      return;
    }

    try {
      await onAddTask({ title: newTask.trim(), category });
      setNewTask("");
      setCategory("");
      setError("");
    } catch (err) {
      setError("Something went wrong");
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
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 700, mb: 1, color: "text.primary" }}
          >
            Create New Task
          </Typography>
          <TextField
            fullWidth
            placeholder="What needs to be done?"
            value={newTask}
            onChange={(e) => {
              setError("");
              setNewTask(e.target.value);
            }}
            error={Boolean(error)}
            helperText={error}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "#f8fafc",
              },
            }}
          />
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="flex-start"
        >
          <TextField
            select
            fullWidth
            label="Category"
            size="small"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{
              minWidth: { sm: 200 },
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CategoryIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="" disabled>
              Select Category
            </MenuItem>
            {categoryList.map((val, idx) => (
              <MenuItem key={idx} value={val}>
                {val}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleClick}
            disabled={!newTask.trim() || !category}
            startIcon={<AddCircleOutlineIcon />}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              px: 4,
              height: 40,
              boxShadow: "none",
              background: "linear-gradient(45deg, #2563eb 30%, #3b82f6 90%)",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
              },
              "&.Mui-disabled": {
                background: "#e2e8f0",
              },
            }}
          >
            Add Task
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}