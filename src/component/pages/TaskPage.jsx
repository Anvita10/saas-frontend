import React, { useEffect, useState } from "react";
import Sidebar from "../siderbar/Sidebar";
import Header from "../Header";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Stack,
  CircularProgress,
  Container,
  Fade,
} from "@mui/material";
import TaskList from "../task/TaskList";
import useApiClient from "../../hooks/useApiClient";
import TaskInput from "../task/TaskInput";
import AiTaskSuggest from "../task/AiTaskSuggest";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function TaskPage() {
  const [task, setTask] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiClient = useApiClient();

  const fetchTask = async () => {
    const res = await apiClient("/tasks");
    setTask(res);
  };

  const fetchCategoryList = async () => {
    const res = await apiClient("/tasks/categorylist");
    setCategoryList(res.data);
  };

  useEffect(() => {
    const init = async () => {
      await Promise.all([fetchTask(), fetchCategoryList()]);
      setLoading(false);
    };
    init();
  }, []);

  const handleAddTask = async ({ title, category }) => {
    await apiClient("/tasks", {
      method: "POST",
      body: { title, category },
    });
    fetchTask();
  };

  if (loading)
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#f8fafc",
        }}
      >
        <CircularProgress thickness={4} size={48} sx={{ color: "primary.main" }} />
        <Typography variant="body2" color="text.secondary" fontWeight="500">
          Loading your workspace...
        </Typography>
      </Box>
    );

  return (
    <Box sx={{ display: "flex", bgcolor: "#f8fafc", minHeight: "100vh" }}>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { xs: 0 },
          width: { xs: "100%", md: `calc(100% - 220px)` },
        }}
      >
        <Header />

        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Box mb={4}>
            <Stack direction="row" alignItems="center" spacing={1.5} mb={0.5}>
              <AssignmentTurnedInIcon color="primary" sx={{ fontSize: 32 }} />
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#1e293b" }}>
                Task Manager
              </Typography>
            </Stack>
            <Typography variant="body1" sx={{ color: "text.secondary", ml: 5.5 }}>
              Organize your work efficiently and boost your productivity 🚀
            </Typography>
          </Box>

          <Stack spacing={6}>
            <Grid container spacing={6}>
              <Grid item xs={12} md={7}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: "100%",
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
                    <AddCircleOutlineIcon color="primary" fontSize="small" />
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#334155" }}>
                      Create New Task
                    </Typography>
                  </Stack>
                  <TaskInput categoryList={categoryList} onAddTask={handleAddTask} />
                </Paper>
              </Grid>

              <Grid item xs={12} md={5}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4, 
                    height: "100%",
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "rgba(99, 102, 241, 0.03)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
                    <AutoAwesomeIcon sx={{ color: "#6366f1", fontSize: "1.2rem" }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#4338ca" }}>
                      AI Quick Suggest
                    </Typography>
                  </Stack>
                  <Box sx={{ mb: 3 }}>
                    <AiTaskSuggest categoryList={categoryList} onAddTask={handleAddTask} />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic", opacity: 0.8 }}>
                    Pick a category and let AI suggest your next big task.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            <Box>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4} px={1}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#1e293b" }}>
                  Your Workspace
                </Typography>
                <Box
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    px: 2.5,
                    py: 0.7,
                    borderRadius: 3,
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
                  }}
                >
                  {task.length} Tasks Found
                </Box>
              </Stack>

              {task.length === 0 ? (
                <Fade in timeout={600}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 12,
                      textAlign: "center",
                      borderRadius: 5,
                      borderStyle: "dashed",
                      borderWidth: 2,
                      bgcolor: "transparent",
                    }}
                  >
                    <AssignmentTurnedInIcon sx={{ fontSize: 60, color: "text.disabled", mb: 2, opacity: 0.5 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                      Your list is empty
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Ready to start? Use the forms above to create your first task.
                    </Typography>
                  </Paper>
                </Fade>
              ) : (
                <Box sx={{ minHeight: 400 }}>
                  <TaskList task={task} fetchTask={fetchTask} />
                </Box>
              )}
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default TaskPage;