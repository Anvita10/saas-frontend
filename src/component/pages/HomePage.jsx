import Header from "../Header";
import Sidebar from "../siderbar/Sidebar";
import { Box, Typography, Paper, Grid } from "@mui/material";

function Home() {
  return (
    <Box sx={{ display: "flex", bgcolor: "#f8fafc" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1,  }}>
        <Header />

        <Box p={3}>
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{ mb: 3, color: "#1e293b" }}
          >
            Dashboard Overview 👋
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  color: "#fff",
                }}
              >
                <Typography variant="body2">Total Tasks</Typography>
                <Typography variant="h4" fontWeight="700">
                  24
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background:
                    "linear-gradient(135deg, #10b981 0%, #22c55e 100%)",
                  color: "#fff",
                }}
              >
                <Typography variant="body2">Completed</Typography>
                <Typography variant="h4" fontWeight="700">
                  18
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background:
                    "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
                  color: "#fff",
                }}
              >
                <Typography variant="body2">Pending</Typography>
                <Typography variant="h4" fontWeight="700">
                  6
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Paper
            elevation={2}
            sx={{
              mt: 4,
              p: 3,
              borderRadius: 3,
              background: "#ffffff",
            }}
          >
            <Typography variant="h6" fontWeight="600" mb={2}>
              Welcome 🚀
            </Typography>

            <Typography variant="body2" color="text.secondary">
              This is your dashboard. You can manage tasks, track progress,
              and stay productive.
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
