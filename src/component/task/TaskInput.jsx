import { TextField, Button, Stack, MenuItem } from "@mui/material";
import { useState } from "react";

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
    <Stack spacing={2}>
      <TextField
        fullWidth
        placeholder="Enter a new task..."
        value={newTask}
        onChange={(e) => {
          setError("");
          setNewTask(e.target.value);
        }}
        error={Boolean(error)}
        helperText={error}
      />

      <Stack direction="row" spacing={2}>
        <TextField
          select
          size="small"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">Category</MenuItem>
          {categoryList.map((val, idx) => (
            <MenuItem key={idx} value={val}>
              {val}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          onClick={handleClick}
          disabled={!newTask.trim() || !category}
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          Add Task
        </Button>
      </Stack>
    </Stack>
  );
}
