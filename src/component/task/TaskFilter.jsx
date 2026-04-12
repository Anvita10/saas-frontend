import {
  TextField,
  MenuItem,
  Button,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default function TaskFilter({ fetchTask, status, members }) {
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    assignedTo: "",
    dueDate: null,
  });

  const priorityList = ["Low", "Medium", "High"];

  // THE FIX: Standardized dimensions for ALL field types
  const fieldStyle = {
    flex: "1 1 200px", // Allows them to grow equally but stay at least 200px
    minWidth: "150px",
    "& .MuiOutlinedInput-root": {
      height: "48px", // Fixed Height
      borderRadius: "12px",
      bgcolor: "#fff",
      "& fieldset": { borderColor: "#e2e8f0" },
    },
    "& .MuiInputLabel-root": {
      fontSize: "0.75rem",
      fontWeight: 800,
      letterSpacing: "0.05em",
      color: "#94a3b8",
      transform: "translate(14px, 14px) scale(1)", // Centers label when not shrunk
      "&.MuiInputLabel-shrink": {
        transform: "translate(14px, -9px) scale(0.8)", // Clean shrink
        color: "#0e7490",
      },
    },
    "& .MuiSelect-select": {
      paddingTop: "12px",
      paddingBottom: "12px",
    },
  };

  const applyFilters = () => {
    const queryObj = {};
    if (filters.status) queryObj.status = filters.status;
    if (filters.priority) queryObj.priority = filters.priority;
    if (filters.assignedTo) queryObj.assignedTo = filters.assignedTo;
    if (filters.dueDate) queryObj.dueDate = filters.dueDate.toISOString();
    fetchTask(new URLSearchParams(queryObj).toString());
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* 1. FLEX LAYOUT: Prevents the Grid-Squash */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <TextField
          select
          label="STATUS"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          sx={fieldStyle}
          InputLabelProps={{ shrink: true }}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {status.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="PRIORITY"
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          sx={fieldStyle}
          InputLabelProps={{ shrink: true }}
        >
          <MenuItem value="">
            <em>Any</em>
          </MenuItem>
          {priorityList.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="ASSIGNEE"
          value={filters.assignedTo}
          onChange={(e) =>
            setFilters({ ...filters, assignedTo: e.target.value })
          }
          sx={fieldStyle}
          InputLabelProps={{ shrink: true }}
        >
          <MenuItem value="">
            <em>Everyone</em>
          </MenuItem>
          {members.map((m) => (
            <MenuItem key={m.id} value={m.id}>
              {m.name}
            </MenuItem>
          ))}
        </TextField>

        <DatePicker
          label="DUE DATE"
          value={filters.dueDate}
          onChange={(val) => setFilters({ ...filters, dueDate: val })}
          slotProps={{
            textField: {
              sx: fieldStyle,
              InputLabelProps: { shrink: true },
            },
          }}
        />
      </Stack>

      {/* 2. ACTION BUTTONS */}
      <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
        <Button
          onClick={() => {
            setFilters({
              status: "",
              priority: "",
              assignedTo: "",
              dueDate: null,
            });
            fetchTask("");
          }}
          startIcon={<RestartAltIcon />}
          sx={{ color: "#94a3b8", fontWeight: 700, textTransform: "none" }}
        >
          Reset
        </Button>

        <Button
          onClick={applyFilters}
          variant="contained"
          startIcon={<FilterListIcon />}
          sx={{
            textTransform: "none",
            fontWeight: 800,
            borderRadius: "12px",
            px: 4,
            height: "44px",
            background: "linear-gradient(90deg, #134e4a 0%, #0891b2 100%)", // MATCHES YOUR TEAL
            boxShadow: "0 4px 10px rgba(8, 145, 178, 0.2)",
            "&:hover": { opacity: 0.9 },
          }}
        >
          Apply Filters
        </Button>
      </Stack>
    </Box>
  );
}
