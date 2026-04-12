import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Stack,
  Divider,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import useApiClient from "../../hooks/useApiClient";
import { useNavigate } from "react-router-dom";
import CreateWorkspace from "../workspace/CreateWorkspace";
import AddIcon from "@mui/icons-material/Add";
import BusinessIcon from "@mui/icons-material/Business";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentIcon from "@mui/icons-material/Assignment";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch"; // New icon for empty state

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [workspace, setWorkspace] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const apiClient = useApiClient();

  const getMyWorkspace = async () => {
    try {
      const res = await apiClient("/workspaces");
      if (res.success) {
        setWorkspace(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch workspaces:", err);
    }
  };

  useEffect(() => {
    const init = async () => {
      await getMyWorkspace();
    };

    init();
  }, []);

  const hasWorkspaces = workspace.length > 0;

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", p: { xs: 3, md: 5 } }}>
      {/* --- SECTION 1: WELCOME --- */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        mb={hasWorkspaces ? 5 : 2}
      >
        <Box>
          <Typography
            variant="overline"
            sx={{
              color: "#1db5c7",
              fontWeight: 800,
              letterSpacing: 1.2,
              fontSize: "0.7rem",
            }}
          >
            WORKSPACE DASHBOARD
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "#0f172a",
              mt: 0.5,
              letterSpacing: "-0.02em",
              fontSize: { xs: "1.75rem", md: "2.1rem" },
            }}
          >
            Hey, {user}
          </Typography>
          {hasWorkspaces && (
            <Typography
              variant="body2"
              sx={{ color: "#64748b", fontWeight: 500, mt: 0.5 }}
            >
              Here is what's happening across your projects today.
            </Typography>
          )}
        </Box>

        {hasWorkspaces && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
            sx={{
              bgcolor: "#0f172a",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              py: 1,
              boxShadow: "none",
              "&:hover": { bgcolor: "#1db5c7" },
            }}
          >
            Create Workspace
          </Button>
        )}
      </Stack>

      {/* --- SECTION 2: CONTENT (STATS + LIST or EMPTY STATE) --- */}
      {!hasWorkspaces ? (
        /* EMPTY STATE VIEW */
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: 8,
            textAlign: "center",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 6,
              maxWidth: 500,
              borderRadius: 4,
              border: "1px solid #e2e8f0",
              bgcolor: "#ffffff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.05)",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "rgba(29, 181, 199, 0.1)",
                color: "#1db5c7",
                width: 80,
                height: 80,
                mb: 3,
              }}
            >
              <RocketLaunchIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, color: "#0f172a", mb: 1 }}
            >
              Ready to collaborate?
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#64748b", mb: 4, fontWeight: 500 }}
            >
              You haven't joined or created any workspaces yet. Create your
              first workspace to start managing projects and team members.
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={() => setOpen(true)}
              sx={{
                bgcolor: "#1db5c7",
                color: "white",
                fontWeight: 800,
                textTransform: "none",
                borderRadius: 2.5,
                px: 5,
                py: 1.5,
                fontSize: "1rem",
                boxShadow: "0 10px 15px -3px rgba(29, 181, 199, 0.3)",
                "&:hover": { bgcolor: "#0f172a" },
              }}
            >
              Create My First Workspace
            </Button>
          </Paper>
        </Box>
      ) : (
        /* ACTIVE STATE VIEW */
        <>
          <Grid container spacing={2} mb={5}>
            <Grid item xs={12} sm={4} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  bgcolor: "#ffffff",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "rgba(29, 181, 199, 0.08)",
                    color: "#1db5c7",
                    width: 40,
                    height: 40,
                  }}
                >
                  <BusinessIcon fontSize="small" />
                </Avatar>
                <Box>
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    color="text.secondary"
                    sx={{ display: "block", lineHeight: 1 }}
                  >
                    TOTAL WORKSPACES
                  </Typography>
                  <Typography variant="h6" fontWeight={800} sx={{ mt: 0.5 }}>
                    {workspace.length}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, color: "#0f172a", mb: 2.5 }}
          >
            Active Workspaces
          </Typography>

          <Grid container spacing={3}>
            {workspace.map((ws) => (
              <Grid item xs={12} sm={6} lg={4} key={ws.id}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 2.5,
                    border: "1px solid #e2e8f0",
                    bgcolor: "#ffffff",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    "&:hover": {
                      borderColor: "#1db5c7",
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 20px -10px rgba(0,0,0,0.08)",
                    },
                  }}
                  onClick={() => navigate(`/workspace/${ws.id}`)}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    mb={2.5}
                  >
                    <Avatar
                      variant="rounded"
                      sx={{
                        bgcolor: "#0f172a",
                        borderRadius: 1.5,
                        width: 40,
                        height: 40,
                        fontWeight: 800,
                        fontSize: "0.9rem",
                      }}
                    >
                      {ws.wsName.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box
                      sx={{
                        fontSize: "0.65rem",
                        fontWeight: 800,
                        color: "#1db5c7",
                        bgcolor: "rgba(29, 181, 199, 0.08)",
                        px: 1,
                        py: 0.3,
                        borderRadius: 1,
                        height: "fit-content",
                      }}
                    >
                      {ws.role?.toUpperCase() || "MEMBER"}
                    </Box>
                  </Stack>

                  <Box mb={2}>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 800, color: "#0f172a", mb: 0.2 }}
                    >
                      {ws.wsName}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#94a3b8",
                        fontWeight: 600,
                        display: "block",
                      }}
                    >
                      Workspace Name
                    </Typography>
                  </Box>

                  <Divider sx={{ mb: 2, opacity: 0.6 }} />

                  <Stack spacing={1.5} mb={2.5}>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <GroupIcon sx={{ fontSize: 16, color: "#94a3b8" }} />
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 700, color: "#334155" }}
                      >
                        {ws.memberCount || 1} Members
                      </Typography>
                    </Stack>
                  </Stack>

                  <Box>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      mb={0.5}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 700,
                          color: "#64748b",
                          fontSize: "0.65rem",
                        }}
                      >
                        SETUP PROGRESS
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 800,
                          color: "#1db5c7",
                          fontSize: "0.65rem",
                        }}
                      >
                        100%
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={100}
                      sx={{
                        height: 4,
                        borderRadius: 1,
                        bgcolor: "#f1f5f9",
                        "& .MuiLinearProgress-bar": { bgcolor: "#1db5c7" },
                      }}
                    />
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* --- CREATE WORKSPACE DIALOG --- */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="xs"
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle
          sx={{ fontWeight: 800, color: "#0f172a", textAlign: "center", pt: 2 }}
        >
          Create New Workspace
        </DialogTitle>
        <DialogContent>
          <CreateWorkspace
            onClose={() => setOpen(false)}
            getMyWorkspace={getMyWorkspace}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Dashboard;
