import { Box, CircularProgress, useTheme } from "@mui/material";

function FullScreenLoader() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.tokens.gradients.hero,
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default FullScreenLoader;
