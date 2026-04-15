import {
  TextField,
  Button,
  Stack,
  MenuItem,
  InputAdornment,
  Box,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import FlagIcon from "@mui/icons-material/Flag";

export default function TaskInput({ userList, onAddTask }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "Medium",
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
    try {
      await onAddTask(payload);
      setForm({
        title: "",
        description: "",
        assignedTo: "",
        priority: "Medium",
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
    <Stack spacing={2.5}>
      <TextField
        fullWidth
        size="small"
        label="Title"
        value={form.title}
        name="title"
        onChange={handleFormChange}
        error={Boolean(error.title)}
        helperText={error.title}
      />

      <TextField
        fullWidth
        size="small"
        multiline
        rows={3}
        label="Description"
        value={form.description}
        name="description"
        onChange={handleFormChange}
        error={Boolean(error.description)}
        helperText={error.description}
      />

      <Stack direction="row" spacing={2}>
        <TextField
          select
          fullWidth
          size="small"
          label="Assignee"
          value={form.assignedTo}
          name="assignedTo"
          onChange={handleFormChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon sx={{ fontSize: 18 }} />
              </InputAdornment>
            ),
          }}
        >
          {userList.map((val) => (
            <MenuItem key={val.id} value={val.id}>
              {val.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          size="small"
          label="Priority"
          value={form.priority}
          name="priority"
          onChange={handleFormChange}
        >
          {priorityList.map((val, idx) => (
            <MenuItem key={idx} value={val}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <FlagIcon
                  sx={{
                    fontSize: 16,
                    color:
                      val === "High"
                        ? "error.main"
                        : val === "Medium"
                          ? "warning.main"
                          : "success.main",
                  }}
                />
                {val}
              </Box>
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <DatePicker
        label="Due Date"
        value={form.dueDate}
        onChange={(val) => setForm((prev) => ({ ...prev, dueDate: val }))}
        disablePast
        slotProps={{
          textField: {
            size: "small",
            fullWidth: true,
          },
        }}
      />

      <Button
        fullWidth
        variant="contained"
        onClick={handleClick}
        disabled={!form.title.trim() || !form.description.trim()}
      >
        Create Task
      </Button>
    </Stack>
  );
}
