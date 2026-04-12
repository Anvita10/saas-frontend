import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Container,
  Fade,
  Chip,
  useTheme,
  Divider,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import TaskList from "../task/TaskList";
import useApiClient from "../../hooks/useApiClient";
import TaskInput from "../task/TaskInput";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AddIcon from "@mui/icons-material/Add";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "react-router-dom";
import TaskFilter from "../task/TaskFilter";

function TaskPage() {
  const [task, setTask] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [members, SetMembers] = useState([]);
  const [openCreate, setOpenCreate] = useState(false); // Modal State
  const status = ["Completed", "Pending", "In-Progress", "ToDo", "Rejected"];
  const { workspaceId } = useParams();
  const apiClient = useApiClient();
  const theme = useTheme();

  const fetchTask = async (queryString = "") => {
    try {
      const url = queryString
        ? `/workspaces/${workspaceId}/tasks?${queryString}`
        : `/workspaces/${workspaceId}/tasks`;

      const res = await apiClient(url);
      if (res.data) setTask(res.data);
      setIsFiltered(!!queryString);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await apiClient(`/workspaces/${workspaceId}/members`);
      if (res.data) SetMembers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchTask();
  }, [workspaceId]);

  const handleAddTask = async (payload) => {
    const res = await apiClient(`/workspaces/${workspaceId}/tasks`, {
      method: "POST",
      body: payload,
    });
    if (res.success) {
      setOpenCreate(false); // Close modal on success
      fetchTask();
    }
  };

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", pb: 10 }}>
      {/* HEADER SECTION */}
      <Box
        sx={{
          bgcolor: "#fff",
          borderBottom: "1px solid #e2e8f0",
          mb: 4,
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                sx={{
                  bgcolor: "#6366f1",
                  p: 1,
                  borderRadius: 2,
                  display: "flex",
                  boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
                }}
              >
                <AssignmentTurnedInIcon sx={{ color: "#fff" }} />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 800, color: "#0f172a", lineHeight: 1.2 }}
                >
                  Task Manager
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#64748b", fontWeight: 600 }}
                >
                  {isFiltered ? "Filtered View" : "All Operations"}
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <Chip
                label={`${task.length} Total`}
                sx={{
                  fontWeight: 700,
                  bgcolor: "#f1f5f9",
                  color: "#475569",
                  borderRadius: 1.5,
                }}
              />
              <Button
                variant="contained"
                disableElevation
                startIcon={<AddIcon />}
                onClick={() => setOpenCreate(true)}
                sx={{
                  bgcolor: "#1e293b",
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: "10px",
                  px: 3,
                  "&:hover": { bgcolor: "#0f172a" },
                }}
              >
                New Task
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl">
        <Stack spacing={4}>
          {/* FILTER PANEL - Now clean and prominent */}
          <Paper
            elevation={0}
            sx={{ p: 3, borderRadius: 4, border: "1px solid #e2e8f0" }}
          >
            <Stack direction="row" alignItems="center" spacing={1} mb={3}>
              <TuneIcon sx={{ fontSize: 20, color: "#6366f1" }} />
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 800, color: "#1e293b" }}
              >
                Quick Filters
              </Typography>
            </Stack>
            <TaskFilter
              fetchTask={fetchTask}
              status={status}
              members={members}
            />
          </Paper>

          {/* TASK LIST AREA */}
          <Box>
            {task.length === 0 ? (
              <Fade in>
                <Paper
                  variant="outlined"
                  sx={{
                    py: 10,
                    textAlign: "center",
                    borderRadius: 4,
                    borderStyle: "dashed",
                  }}
                >
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    fontWeight={700}
                  >
                    No tasks match your criteria
                  </Typography>
                  <Button
                    onClick={() => setOpenCreate(true)}
                    sx={{ mt: 2, textTransform: "none" }}
                  >
                    Create your first task
                  </Button>
                </Paper>
              </Fade>
            ) : (
              <TaskList
                task={task}
                fetchTask={fetchTask}
                status={status}
                members={members}
              />
            )}
          </Box>
        </Stack>
      </Container>

      {/* CREATE TASK MODAL - Solves the "Overlapping" and "Design mismatch" */}
      <Dialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4, p: 1 } }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight={800}>
            Create New Task
          </Typography>
          <IconButton onClick={() => setOpenCreate(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <TaskInput userList={members} onAddTask={handleAddTask} />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default TaskPage;
