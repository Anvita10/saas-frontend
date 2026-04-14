import {
  Paper,
  Typography,
  Avatar,
  Stack,
  Box,
  Divider,
  LinearProgress,
  Chip,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { CARD_HOVER, CARD_STYLES } from "../../theme/commonStyle";

function WorkspaceCard({ ws, onClick }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        minHeight: 180, // 🔥 KEY FIX (card feels bigger)
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        ...CARD_STYLES,
        ...CARD_HOVER,
      }}
      onClick={onClick}
    >
      {/* TOP SECTION */}
      <Box>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Typography
            variant="h5" // 🔥 BIG upgrade from h6
            sx={{
              fontWeight: 800,
              color: "#0f172a",
              mb: 0.5,
            }}
          >
            {ws.wsName}
          </Typography>
        </Stack>

        <Chip
          label={ws.role?.toUpperCase() || "MEMBER"}
          size="medium"
          sx={{
            fontSize: "0.75rem",
            fontWeight: 700,
            bgcolor: "rgba(29, 181, 199, 0.1)",
            color: "#1db5c7",
          }}
        />

        <Divider sx={{ mb: 2, mt: 4 }} />

        {/* MEMBERS */}
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <GroupIcon sx={{ fontSize: 22, color: "#94a3b8" }} />

          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {ws.memberCount || 1} Members
          </Typography>
        </Stack>
      </Box>

      {/* BOTTOM SECTION */}
      <Box mt={3}>
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <Typography variant="caption" color="text.secondary">
            SETUP PROGRESS
          </Typography>

          <Typography variant="caption" color="primary">
            100%
          </Typography>
        </Stack>

        <LinearProgress variant="determinate" value={100} />
      </Box>
    </Paper>
  );
}

export default WorkspaceCard;
