import { Box, Container, Typography, Grid, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import MembersSection from "./MembersSection";
import DangerZone from "./DangerZone";

function WorkspaceSettings() {
  const { workspaceId } = useParams();

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="xl">
        {" "}
        {/* Increased width for side-by-side comfort */}
        {/* PAGE HEADER */}
        <Box sx={{ mb: 6, px: 2 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              color: "#0f172a",
              mb: 1,
              letterSpacing: "-0.03em",
            }}
          >
            Workspace Settings
          </Typography>
          <Typography
            sx={{ color: "#64748b", fontSize: "1.1rem", fontWeight: 500 }}
          >
            Manage your organization, team access, and security protocols.
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {/* LEFT COLUMN: TEAM MEMBERS (65% width) */}
          <Grid item xs={12} lg={8}>
            <Stack spacing={2}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 800, color: "#1e293b", px: 1 }}
              >
                Team Management
              </Typography>
              <Box
                sx={{
                  bgcolor: "#fff",
                  borderRadius: "24px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                  overflow: "hidden",
                }}
              >
                {/* Information Header */}
                <Box sx={{ p: 3, borderBottom: "1px solid #f1f5f9" }}>
                  <Typography sx={{ fontSize: "1rem", color: "#64748b" }}>
                    Review and manage who has access to this workspace and their
                    permission levels.
                  </Typography>
                </Box>

                {/* Interaction Area (Gray Background) */}
                <Box sx={{ bgcolor: "#f8fafc" }}>
                  <MembersSection workspaceId={workspaceId} />
                </Box>
              </Box>
            </Stack>
          </Grid>

          {/* RIGHT COLUMN: DANGER ZONE (35% width) */}
          <Grid item xs={12} lg={4}>
            <Stack spacing={2}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 800, color: "#ef4444", px: 1 }}
              >
                Critical Actions
              </Typography>
              <Box
                sx={{
                  bgcolor: "#fff",
                  borderRadius: "24px",
                  border: "1px solid #fee2e2",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                {/* Information Header */}
                <Box sx={{ p: 3, borderBottom: "1px solid #fee2e2" }}>
                  <Typography
                    sx={{ fontSize: "1rem", color: "#991b1b", fontWeight: 500 }}
                  >
                    Proceed with extreme caution.
                  </Typography>
                </Box>

                {/* Interaction Area (Red Background) */}
                <Box
                  sx={{
                    bgcolor: "#fff1f1",
                    minHeight: "200px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <DangerZone workspaceId={workspaceId} />
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default WorkspaceSettings;
