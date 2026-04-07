import { TextField, Button, Stack, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";

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
    if (!form.title.trim()) {
      setError((prev) => ({ ...prev, title: "Title is required" }));
      return;
    }

    if (!form.description.trim()) {
      setError((prev) => ({ ...prev, description: "Description is required" }));
      return;
    }
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
    };

    if (form.assignedTo) payload.assignedTo = form.assignedTo;
    if (form.dueDate) payload.dueDate = form.dueDate.toISOString();
    if (form.category) payload.category = form.category;
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
    <Stack spacing={2}>
      <TextField
        fullWidth
        label="Title"
        placeholder="Enter the title"
        value={form.title}
        name="title"
        onChange={(e) => handleFormChange(e)}
        error={Boolean(error.title)}
        helperText={error.title}
      />

      <TextField
        fullWidth
        label="Description"
        placeholder="Enter the description"
        value={form.description}
        name="description"
        onChange={(e) => handleFormChange(e)}
        error={Boolean(error.description)}
        helperText={error.description}
      />

      <TextField
        select
        label="Assigned To"
        value={form.assignedTo}
        name="assignedTo"
        onChange={(e) => handleFormChange(e)}
      >
        {categoryList.map((val, idx) => (
          <MenuItem key={idx} value={val}>
            {val}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Priority"
        value={form.priority}
        name="priority"
        onChange={(e) => handleFormChange(e)}
      >
        {priorityList.map((val, idx) => (
          <MenuItem key={idx} value={val}>
            {val}
          </MenuItem>
        ))}
      </TextField>

      <DatePicker
        label="Due Date"
        value={form.dueDate}
        onChange={(val) => setForm((prev) => ({ ...prev, dueDate: val }))}
        disablePast
      />

      <Stack direction="row" spacing={2}>
        <TextField
          label="Category"
          select
          size="small"
          name="category"
          value={form.category}
          onChange={(e) => handleFormChange(e)}
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
          disabled={!form.title.trim() || !form.description.trim()}
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          Add Task
        </Button>
      </Stack>
    </Stack>
  );
}
