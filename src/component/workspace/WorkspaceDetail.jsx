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
import { useCallback, useEffect, useState } from "react";
import useApiClient from "../../hooks/useApiClient";
import { useNavigate, useParams } from "react-router-dom";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListAltIcon from "@mui/icons-material/ListAlt";
import GroupIcon from "@mui/icons-material/Group";
import {
  CARD_HOVER,
  CARD_STYLES,
  getPriorityColor,
  getStatusConfig,
} from "../../theme/commonStyle";

const WorkspaceDetail = () => {
  const apiClient = useApiClient();
  const { workspaceId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchWorkspaceDetail = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient(`/workspaces/${workspaceId}`);
      setData(response.data);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  }, [apiClient, workspaceId]);

  useEffect(() => {
    const init = async () => {
      await fetchWorkspaceDetail();
    };
    init();
  }, [fetchWorkspaceDetail]);

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
            <IconButton
              sx={{ border: "1px solid #e2e8f0" }}
              onClick={() => navigate(`/workspace/${workspaceId}/setting`)}
            >
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
          <Grid item xs={12} md={8}>
            <Paper
              variant="outlined"
              sx={{
                ...CARD_STYLES,
                ...CARD_HOVER,
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
                    const statusStyles = getStatusConfig(task.status);
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
                        {/* Priority Bar */}
                        <Box
                          sx={{
                            width: 4,
                            height: 40,
                            bgcolor: getPriorityColor(task.priority),
                            borderRadius: 4,
                            mr: 2,
                            flexShrink: 0,
                          }}
                        />

                        {/* Content */}
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            variant="body2"
                            fontWeight="700"
                            color="#334155"
                            noWrap
                          >
                            {task.title}
                          </Typography>

                          <Typography
                            variant="caption"
                            sx={{ color: "#64748b", fontWeight: 500 }}
                          >
                            Due • {new Date(task.dueDate).toLocaleDateString()}
                          </Typography>
                        </Box>

                        {/* Right Section */}
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1.5}
                          sx={{
                            ml: 2,
                            flexShrink: 0,
                          }}
                        >
                          <Chip
                            label={task.status}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              fontSize: "0.75rem",
                              height: 24,
                              borderRadius: 1,
                              color: statusStyles.color,
                              bgcolor: statusStyles.bg,
                              border: `1px solid ${statusStyles.color}30`, // 🔥 makes it visible
                            }}
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
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WorkspaceDetail;
