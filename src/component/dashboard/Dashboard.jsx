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
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useApiClient from "../../hooks/useApiClient";
import { useNavigate } from "react-router-dom";
import CreateWorkspace from "../workspace/CreateWorkspace";
import AddIcon from "@mui/icons-material/Add";
import BusinessIcon from "@mui/icons-material/Business";
import WorkspaceCard from "./WorkspaceCard";
import EmptyState from "./EmptyState";
import { pageWrapper, statCard } from "./dashboardStyles";

function Dashboard() {
  const { user } = useAuth();
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
    <Box sx={pageWrapper}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
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
          <Typography variant="h3">Hey, {user}</Typography>
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
          >
            Create Workspace
          </Button>
        )}
      </Stack>

      {!hasWorkspaces ? (
        <EmptyState onCreate={() => setOpen(true)} />
      ) : (
        <>
          <Grid container spacing={3} mb={6} mt={4}>
            <Grid item xs={12} sm={4} md={3}>
              <Paper elevation={0} sx={statCard}>
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
                    variant="body2"
                    fontWeight={700}
                    color="text.secondary"
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
            variant="h5"
            sx={{ fontWeight: 700, color: "#0f172a", mb: 2.5 }}
          >
            Active Workspaces
          </Typography>

          <Grid container spacing={3}>
            {workspace.map((ws) => (
              <Grid item xs={12} sm={6} lg={4} key={ws.id}>
                <WorkspaceCard
                  ws={ws}
                  onClick={() => navigate(`/workspace/${ws.id}`)}
                />
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
