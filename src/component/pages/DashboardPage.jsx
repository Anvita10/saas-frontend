import { useEffect, useState } from "react";
import Sidebar from "../siderbar/Sidebar";
import Header from "../Header";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";
import useApiClient from "../../hooks/useApiClient";

function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const apiClient = useApiClient();

  useEffect(() => {
    apiClient("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [apiClient]);

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, ml: "220px" }}>
        <Header />

        <Box p={3}>
          <Typography variant="h5" fontWeight="600" mb={2}>
            Dashboard
          </Typography>

          {/* Loading */}
          {loading && <CircularProgress />}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error?.message || "Something went wrong"}
            </Alert>
          )}

          {/* Users Grid */}
          {!loading && !error && (
            <Grid container spacing={2}>
              {users.map((val) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={val.id}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: 2,
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" fontWeight="600">
                        {val.name}
                      </Typography>

                      <Typography color="text.secondary">
                        @{val.username}
                      </Typography>

                      <Typography mt={1}>{val.email}</Typography>

                      <Typography color="text.secondary">
                        {val.phone}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardPage;
