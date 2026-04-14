import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Box,
} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import GroupsIcon from "@mui/icons-material/Groups";
import InsightsIcon from "@mui/icons-material/Insights";
import { FEATURES } from "../../constants/Constants";

const iconMap = {
  task: <TaskAltIcon sx={{ fontSize: 42 }} />,
  team: <GroupsIcon sx={{ fontSize: 42 }} />,
  insights: <InsightsIcon sx={{ fontSize: 42 }} />,
};

export default function FeaturesSection() {
  return (
    <Container maxWidth="lg" sx={{ py: 15 }}>
      <Stack alignItems="center" textAlign="center" spacing={2} mb={10}>
        <Typography variant="h3" sx={{ fontWeight: 900 }}>
          Everything You Need to Scale
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 600 }}>
          No more jumping between apps...
        </Typography>
      </Stack>

      <Grid container spacing={4}>
        {FEATURES.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ color: item.color, mb: 3 }}>
                  {iconMap[item.icon]}
                </Box>
                <Typography variant="h5">{item.title}</Typography>
                <Typography color="text.secondary">{item.desc}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
