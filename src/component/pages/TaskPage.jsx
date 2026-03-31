import { useEffect, useState } from "react";
import Sidebar from "../siderbar/Sidebar";
import Header from "../Header";
import { Box, Typography, Paper, Stack } from "@mui/material";
import TaskList from "../task/TaskList";
import useApiClient from "../../hooks/useApiClient";
import TaskInput from "../task/TaskInput";
import AiTaskSuggest from "../task/AiTaskSuggest";

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

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <>
      <Header />
      <Sidebar />

      <Box sx={{ ml: "220px", p: 4 }}>
        {/* Header */}
        <Box mb={4}>
          <Typography variant="h4" fontWeight="700">
            👋 Welcome back
          </Typography>
          <Typography color="text.secondary">
            Let’s make today productive 🚀
          </Typography>
        </Box>

        {/* Actions Section */}
        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            mb: 4,
            border: "1px solid #eee",
          }}
        >
          <Stack spacing={3}>
            <TaskInput categoryList={categoryList} onAddTask={handleAddTask} />

            <AiTaskSuggest
              categoryList={categoryList}
              onAddTask={handleAddTask}
            />
          </Stack>
        </Paper>

        {/* Empty State */}
        {task.length === 0 && (
          <Paper
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 3,
              border: "1px dashed #ddd",
            }}
          >
            <Typography variant="h6">No tasks yet 😴</Typography>
            <Typography color="text.secondary">
              Start by adding your first task
            </Typography>
          </Paper>
        )}

        {/* Task Grid */}
        <TaskList task={task} fetchTask={fetchTask} />
      </Box>
    </>
  );
}

export default TaskPage;
