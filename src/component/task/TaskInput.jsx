import {
  TextField,
  Button,
  Stack,
  MenuItem,
  InputAdornment,
  Typography,
  Box,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
// Icons for a premium feel
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import FlagIcon from "@mui/icons-material/Flag";

export default function TaskInput({ categoryList, userList, onAddTask }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "Medium",
    dueDate: null,
  });
  const [error, setError] = useState({ title: "", description: "" });

  const priorityList = ["Low", "Medium", "High"];

  // Logic remains exactly as provided
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

  // UI Upgrade using "small" sizes and custom styling for Sidebar fit
  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      bgcolor: "#fcfdfe",
    },
    "& .MuiInputLabel-root": {
      fontSize: "0.875rem",
      fontWeight: 500,
    },
  };

  return (
    <Stack spacing={2.5}>
      <TextField
        fullWidth
        size="small"
        label="Title"
        placeholder="What needs to be done?"
        value={form.title}
        name="title"
        onChange={handleFormChange}
        error={Boolean(error.title)}
        helperText={error.title}
        sx={inputStyle}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TitleIcon sx={{ fontSize: 18, color: "primary.light" }} />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        size="small"
        multiline
        rows={3}
        label="Description"
        placeholder="Add more details..."
        value={form.description}
        name="description"
        onChange={handleFormChange}
        error={Boolean(error.description)}
        helperText={error.description}
        sx={inputStyle}
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
          sx={inputStyle}
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
          sx={inputStyle}
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
            sx: inputStyle,
          },
        }}
      />

      <Button
        fullWidth
        variant="contained"
        onClick={handleClick}
        disabled={!form.title.trim() || !form.description.trim()}
        sx={{
          borderRadius: 2,
          textTransform: "none",
          py: 1.2,
          fontWeight: 700,
          boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
          "&:hover": {
            boxShadow: "0 6px 16px rgba(37, 99, 235, 0.3)",
          },
        }}
      >
        Create Task
      </Button>
    </Stack>
  );
}
