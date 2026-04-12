import {
  Box,
  Typography,
  Grid,
  Avatar,
  Stack,
  Paper,
  Chip,
  Container,
  Skeleton,
  Divider,
  IconButton,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import useApiClient from "../../hooks/useApiClient";
import { useParams } from "react-router-dom";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListAltIcon from "@mui/icons-material/ListAlt";
import GroupIcon from "@mui/icons-material/Group";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const WorkspaceDetail = () => {
  const apiClient = useApiClient();
  const { workspaceId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWorkspaceDetail = async () => {
    try {
      setLoading(true);
      const response = await apiClient(`/workspaces/${workspaceId}`);
      setData(response.data);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchWorkspaceDetail();
    };
    init();
  }, []);

  const getStatusStyles = (status) => {
    const s = status?.toLowerCase();
    switch (s) {
      case "completed":
        return { color: "#10b981", bg: "#ecfdf5" };
      case "in-progress":
        return { color: "#3b82f6", bg: "#eff6ff" };
      case "pending":
        return { color: "#f59e0b", bg: "#fffbeb" };
      case "todo":
        return { color: "#64748b", bg: "#f8fafc" };
      case "rejected":
        return { color: "#ef4444", bg: "#fef2f2" };
      default:
        return { color: "#64748b", bg: "#f1f5f9" };
    }
  };

  const getPriorityColor = (priority) => {
    const p = priority?.toLowerCase();
    if (p === "high") return "#ef4444";
    if (p === "medium") return "#f59e0b";
    return "#10b981";
  };

  if (loading && !data) {
    return (
      <Box sx={{ p: 4, bgcolor: "#f8fafc", minHeight: "100vh" }}>
        <Container maxWidth="xl">
          <Skeleton
            variant="rectangular"
            height={140}
            sx={{ borderRadius: 3, mb: 4 }}
          />
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Skeleton
                variant="rectangular"
                height={450}
                sx={{ borderRadius: 3 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Skeleton
                variant="rectangular"
                height={450}
                sx={{ borderRadius: 3 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }

  if (!data) return null;
  const { workspace, formatedStats, recentTasks } = data;

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", pb: 6 }}>
      {/* 1. HEADER & META SECTION */}
      <Box sx={{ bgcolor: "#fff", borderBottom: "1px solid #e2e8f0", mb: 4 }}>
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" spacing={2.5} alignItems="center">
              <Avatar
                variant="rounded"
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: "primary.main",
                  borderRadius: 2,
                }}
              >
                <WorkspacesIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="800"
                  color="#1e293b"
                  sx={{ letterSpacing: "-0.02em" }}
                >
                  {workspace.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Owned by <b>{workspace.owner.name}</b> •{" "}
                  {workspace.members.length} Members
                </Typography>
              </Box>
            </Stack>
            <IconButton sx={{ border: "1px solid #e2e8f0" }}>
              <MoreVertIcon />
            </IconButton>
          </Stack>

          <Divider sx={{ my: 3 }} />

          {/* QUICK STATS ROW */}
          <Grid container spacing={2}>
            {[
              {
                label: "Total Tasks",
                value: formatedStats.total,
                color: "#1e293b",
              },
              {
                label: "In Progress",
                value: formatedStats["In-Progress"] || 0,
                color: "#3b82f6",
              },
              {
                label: "Completed",
                value: formatedStats["Completed"] || 0,
                color: "#10b981",
              },
              {
                label: "To Do",
                value: formatedStats["ToDo"] || 0,
                color: "#64748b",
              },
            ].map((stat, i) => (
              <Grid item xs={6} md={3} key={i}>
                <Box>
                  <Typography
                    variant="caption"
                    fontWeight="700"
                    color="text.secondary"
                    sx={{
                      textTransform: "uppercase",
                      display: "block",
                      mb: 0.5,
                    }}
                  >
                    {stat.label}
                  </Typography>
                  <Typography variant="h5" fontWeight="800" color={stat.color}>
                    {stat.value}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/* 2. RECENT TASKS (Main Content) */}
          <Grid item xs={12} md={8}>
            <Paper
              variant="outlined"
              sx={{
                borderRadius: 3,
                border: "1px solid #e2e8f0",
                bgcolor: "#fff",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  p: 2.5,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <ListAltIcon color="action" />
                  <Typography variant="subtitle1" fontWeight="700">
                    Recent Tasks
                  </Typography>
                </Stack>
              </Box>

              <Box>
                {recentTasks.length > 0 ? (
                  recentTasks.map((task, idx) => {
                    const statusStyles = getStatusStyles(task.status);
                    return (
                      <Box
                        key={idx}
                        sx={{
                          p: 2.5,
                          display: "flex",
                          alignItems: "center",
                          borderBottom:
                            idx === recentTasks.length - 1
                              ? "none"
                              : "1px solid #f1f5f9",
                          transition: "all 0.2s",
                          "&:hover": { bgcolor: "#f8fafc" },
                        }}
                      >
                        <Box
                          sx={{
                            width: 4,
                            height: 40,
                            bgcolor: getPriorityColor(task.priority),
                            borderRadius: 4,
                            mr: 2.5,
                          }}
                        />

                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="body2"
                            fontWeight="700"
                            color="#334155"
                            sx={{ mb: 0.5 }}
                          >
                            {task.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </Typography>
                        </Box>

                        <Stack direction="row" spacing={3} alignItems="center">
                          <Chip
                            label={task.status}
                            size="small"
                            sx={{
                              fontWeight: 800,
                              fontSize: "0.65rem",
                              borderRadius: 1.5,
                              color: statusStyles.color,
                              bgcolor: statusStyles.bg,
                            }}
                          />
                          <ArrowForwardIosIcon
                            sx={{ fontSize: 14, color: "#cbd5e1" }}
                          />
                        </Stack>
                      </Box>
                    );
                  })
                ) : (
                  <Box sx={{ p: 8, textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                      No tasks found in this workspace.
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* 3. SIDEBAR (Team & Workspace Meta) */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {/* MEMBERS CARD */}
              <Paper
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  border: "1px solid #e2e8f0",
                  bgcolor: "#fff",
                }}
              >
                <Box
                  sx={{
                    p: 2.5,
                    borderBottom: "1px solid #f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <GroupIcon color="action" fontSize="small" />
                  <Typography variant="subtitle1" fontWeight="700">
                    Team Members
                  </Typography>
                </Box>
                <Box sx={{ p: 1 }}>
                  {workspace.members.map((member, i) => (
                    <Box
                      key={i}
                      sx={{
                        p: 1.5,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 34,
                          height: 34,
                          fontSize: "0.8rem",
                          bgcolor: "primary.light",
                          fontWeight: 700,
                        }}
                      >
                        {member.userId?.name?.charAt(0)}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body2"
                          fontWeight="700"
                          color="#1e293b"
                        >
                          {member.userId?.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {member.role}
                        </Typography>
                      </Box>
                      {member.userId?._id === workspace.owner._id && (
                        <Chip
                          label="Owner"
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: "0.6rem",
                            fontWeight: 700,
                          }}
                        />
                      )}
                    </Box>
                  ))}
                </Box>
              </Paper>

              {/* INFO BOX: Workspace Health */}
              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: "1px solid #e2e8f0",
                  bgcolor: "#1e293b",
                  color: "#fff",
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="700"
                  sx={{ mb: 1, color: "primary.light" }}
                >
                  Workspace Status
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ opacity: 0.8, fontSize: "0.85rem", mb: 2 }}
                >
                  Your team has completed{" "}
                  <b>{formatedStats.Completed || 0} tasks</b> so far. Keep an
                  eye on the <b>{formatedStats.Rejected || 0} rejected</b>{" "}
                  items.
                </Typography>
                <Box
                  sx={{
                    height: 6,
                    width: "100%",
                    bgcolor: "rgba(255,255,255,0.1)",
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      width: `${(formatedStats.Completed / formatedStats.total) * 100 || 0}%`,
                      bgcolor: "primary.main",
                    }}
                  />
                </Box>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WorkspaceDetail;
