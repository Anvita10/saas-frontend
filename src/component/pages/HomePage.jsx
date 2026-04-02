import Header from "../Header";
import Sidebar from "../siderbar/Sidebar";
import { Box, Typography, Paper } from "@mui/material";

function Home() {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, ml: "220px" }}>
        <Header />

        <Box p={3}>
          <Paper
            elevation={2}
            sx={{
              padding: 3,
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" fontWeight="600">
              Home
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
