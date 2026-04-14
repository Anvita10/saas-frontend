import { Box, Paper, Typography, Button, Avatar } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AddIcon from "@mui/icons-material/Add";
import { CARD_HOVER, CARD_STYLES } from "../../theme/commonStyle";

function EmptyState({ onCreate }) {
  return (
    <Box textAlign="center" mt={8}>
      <Paper
        sx={{
          ...CARD_STYLES,
          ...CARD_HOVER,
          p: 6,
          maxWidth: 500,
          mx: "auto",
        }}
      >
        <Avatar sx={{ width: 80, height: 80, mb: 3, mx: "auto" }}>
          <RocketLaunchIcon />
        </Avatar>

        <Typography variant="h5" fontWeight={800}>
          Ready to collaborate?
        </Typography>

        <Typography sx={{ my: 3 }}>Create your first workspace</Typography>

        <Button variant="contained" startIcon={<AddIcon />} onClick={onCreate}>
          Create Workspace
        </Button>
      </Paper>
    </Box>
  );
}

export default EmptyState;
